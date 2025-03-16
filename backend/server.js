const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const app = express();
let PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'developertok-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Improved MongoDB connection handling with in-memory option for development
const connectDB = async () => {
  try {
    // Check if we should use MongoDB Memory Server
    if (process.env.NODE_ENV === 'development' && !process.env.MONGODB_URI) {
      console.log('Using MongoDB Memory Server for development');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log('MongoDB Memory Server connected successfully');
      return true;
    } else {
      // Use the provided URI or local MongoDB
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/developertok');
      console.log('MongoDB connected successfully');
      return true;
    }
  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.log('Trying to connect again in 5 seconds...');
    return false;
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: '' },
  bio: { type: String, default: 'Passionate developer learning new skills every day' },
  preferences: {
    favoriteTopics: { type: [String], default: [] },
    difficulty: { type: String, default: 'beginner' },
    emailNotifications: { type: Boolean, default: true }
  },
  progress: {
    lessonsCompleted: { type: Number, default: 0 },
    challengesSolved: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }
  },
  recentActivity: [{
    type: { type: String, enum: ['lesson', 'challenge'], required: true },
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
    itemId: { type: mongoose.Schema.Types.ObjectId, refPath: 'recentActivity.type' }
  }],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Auth Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Username is already taken' });
    }
    
    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user = new User({
      username,
      email,
      password: hashedPassword,
      bio: 'Passionate developer learning new skills every day',
      progress: {
        lessonsCompleted: 0,
        challengesSolved: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalPoints: 0,
        level: 1,
        badges: 0,
        lastActive: Date.now()
      },
      recentActivity: [
        {
          type: 'lesson',
          title: 'Welcome to DeveloperTok',
          date: Date.now(),
          completed: true
        }
      ]
    });
    
    await user.save();
    
    // Create and return JWT
    const payload = {
      id: user.id
    };
    
    jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ 
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          preferences: user.preferences,
          progress: user.progress,
          recentActivity: user.recentActivity
        }
      });
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Update last active timestamp and save
    user.progress.lastActive = Date.now();
    await user.save();
    
    // Create and return JWT
    const payload = {
      id: user.id
    };
    
    jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ 
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          preferences: user.preferences,
          progress: user.progress,
          recentActivity: user.recentActivity
        }
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route to get user data
app.get('/api/user', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this endpoint to update user progress
app.post('/api/user/progress', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { 
      lessonsCompleted, 
      challengesSolved,
      totalPoints,
      currentStreak,
      badges,
      activityItem
    } = req.body;
    
    // Update progress fields if provided
    if (lessonsCompleted !== undefined) {
      user.progress.lessonsCompleted = lessonsCompleted;
    }
    
    if (challengesSolved !== undefined) {
      user.progress.challengesSolved = challengesSolved;
    }
    
    if (totalPoints !== undefined) {
      user.progress.totalPoints = totalPoints;
      
      // Calculate level based on points (500 points per level)
      user.progress.level = Math.floor(totalPoints / 500) + 1;
    }
    
    if (currentStreak !== undefined) {
      user.progress.currentStreak = currentStreak;
      
      // Update longest streak if current is longer
      if (currentStreak > user.progress.longestStreak) {
        user.progress.longestStreak = currentStreak;
      }
    }
    
    if (badges !== undefined) {
      user.progress.badges = badges;
    }
    
    // Update last active timestamp
    user.progress.lastActive = Date.now();
    
    // Add activity item if provided
    if (activityItem) {
      user.recentActivity.unshift({
        type: activityItem.type,
        title: activityItem.title,
        date: Date.now(),
        completed: activityItem.completed || false,
        itemId: activityItem.itemId
      });
      
      // Keep only the 10 most recent activities
      if (user.recentActivity.length > 10) {
        user.recentActivity = user.recentActivity.slice(0, 10);
      }
    }
    
    await user.save();
    
    res.json({
      message: 'Progress updated successfully',
      progress: user.progress,
      recentActivity: user.recentActivity
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Try to start the server with port fallback and DB connection retry
const startServer = async () => {
  // Try to connect to MongoDB first
  const isConnected = await connectDB();
  
  if (!isConnected) {
    // If connection fails, try again after 5 seconds
    setTimeout(() => startServer(), 5000);
    return;
  }
  
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy, trying port ${PORT + 1}`);
      PORT += 1;
      startServer();
    } else {
      console.error('Server error:', e);
    }
  });
};

startServer(); 