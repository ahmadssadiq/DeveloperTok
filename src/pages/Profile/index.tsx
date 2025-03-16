import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Tabs, 
  Tab, 
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Button,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { 
  Code, 
  CheckCircle, 
  Timeline, 
  TrendingUp, 
  LocalFireDepartment,
  EmojiEvents,
  School,
  Bookmark,
  Settings,
  Logout
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }
      
      try {
        setLoading(true);
        // Simply use the user data from the auth context
        setUserData(user);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    setConfirmLogout(true);
  };

  const confirmLogoutAction = () => {
    logout();
    navigate('/');
    setConfirmLogout(false);
  };

  const cancelLogout = () => {
    setConfirmLogout(false);
  };

  // Format activity date to relative time (e.g., "2 hours ago")
  const formatActivityDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const now = new Date();
    
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
    
    // For older dates, return the formatted date
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">{error}</Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 2 }}
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!userData) {
    return null;
  }

  // Calculate XP needed for next level
  const nextLevelXp = (userData.progress?.level || 1) * 500;
  const currentXp = userData.progress?.totalPoints || 0;
  const xpProgress = Math.min((currentXp / nextLevelXp) * 100, 100);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: 'background.paper' }}>
        {/* Profile Header */}
        <Box sx={{ 
          p: 4, 
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0.1) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <Avatar 
                src={userData.profilePicture}
                sx={{ 
                  width: 100, 
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem',
                  fontWeight: 'bold'
                }}
              >
                {userData.username?.charAt(0)}
              </Avatar>
            </Grid>
            
            <Grid item xs>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {userData.username}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {userData.bio}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Chip 
                  label={`Level ${userData.progress?.level || 1}`} 
                  size="small"
                  sx={{ 
                    bgcolor: 'primary.main', 
                    color: '#fff',
                    fontWeight: 600,
                    mr: 2
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                  {currentXp} / {nextLevelXp} XP
                </Typography>
              </Box>
              
              <LinearProgress 
                variant="determinate" 
                value={xpProgress} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  bgcolor: 'rgba(59,130,246,0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'primary.main'
                  }
                }}
              />
            </Grid>
            
            <Grid item>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<Settings />}
                  sx={{ 
                    borderRadius: 2,
                    borderColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.2)',
                      bgcolor: 'rgba(255,255,255,0.03)'
                    }
                  }}
                >
                  Edit Profile
                </Button>
                
                <Tooltip title="Sign Out">
                  <Button 
                    variant="outlined" 
                    color="error"
                    startIcon={<Logout />}
                    onClick={handleLogout}
                    sx={{ 
                      borderRadius: 2,
                      borderColor: 'rgba(239,68,68,0.5)',
                      color: 'rgb(239,68,68)',
                      '&:hover': {
                        borderColor: 'rgb(239,68,68)',
                        bgcolor: 'rgba(239,68,68,0.04)'
                      }
                    }}
                  >
                    Sign Out
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        {/* Stats Cards */}
        <Box sx={{ px: 4, py: 3, bgcolor: 'background.paper' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)' }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <LocalFireDepartment sx={{ fontSize: 40, color: '#f97316', mb: 1 }} />
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    {userData.progress?.currentStreak || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Day Streak
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)' }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <School sx={{ fontSize: 40, color: '#3b82f6', mb: 1 }} />
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    {userData.progress?.lessonsCompleted || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lessons Completed
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)' }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Code sx={{ fontSize: 40, color: '#10b981', mb: 1 }} />
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    {userData.progress?.challengesSolved || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Challenges Solved
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)' }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <EmojiEvents sx={{ fontSize: 40, color: '#eab308', mb: 1 }} />
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    {userData.progress?.badges || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Badges Earned
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              px: 4,
              '& .MuiTab-root': {
                py: 2,
                px: 3,
                minWidth: 'auto',
                mr: 2,
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 600
              }
            }}
          >
            <Tab icon={<Timeline />} iconPosition="start" label="Overview" />
            <Tab icon={<TrendingUp />} iconPosition="start" label="Progress" />
            <Tab icon={<EmojiEvents />} iconPosition="start" label="Achievements" />
            <Tab icon={<Bookmark />} iconPosition="start" label="Saved" />
          </Tabs>
        </Box>
        
        {/* Tab Content */}
        <Box>
          {tabValue === 0 && (
            <Box sx={{ p: 4 }}>
              {/* Skills */}
              <Typography variant="h6" fontWeight={600} mb={3}>
                Skills
              </Typography>
              
              <Grid container spacing={3}>
                {(userData.preferences?.favoriteTopics || ['JavaScript', 'React', 'CSS', 'Node.js']).map((skill: string) => (
                  <Grid item xs={12} sm={6} md={4} key={skill}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 2, 
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <CheckCircle sx={{ color: '#10b981', mr: 2 }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {skill}
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={Math.random() * 100} 
                          sx={{ 
                            mt: 1,
                            height: 6, 
                            borderRadius: 3,
                            bgcolor: 'rgba(16,185,129,0.1)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: '#10b981'
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              
              {/* Recent Activity */}
              <Card sx={{ mt: 4, p: 3, bgcolor: 'background.paper', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h6" fontWeight={600} mb={3}>
                  Recent Activity
                </Typography>
                
                <List sx={{ p: 0 }}>
                  {userData.recentActivity && userData.recentActivity.length > 0 ? (
                    userData.recentActivity.map((activity: any, index: number) => (
                      <ListItem 
                        key={activity._id || index}
                        sx={{ 
                          px: 2, 
                          py: 1.5, 
                          borderRadius: 2,
                          mb: 1,
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.03)'
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {activity.type === 'lesson' ? 
                            <School color="primary" /> : 
                            <Code sx={{ color: '#10b981' }} />
                          }
                        </ListItemIcon>
                        <ListItemText 
                          primary={activity.title}
                          secondary={formatActivityDate(activity.date)}
                          primaryTypographyProps={{ fontWeight: 600 }}
                        />
                        {activity.completed && (
                          <Chip 
                            label="Completed" 
                            size="small"
                            icon={<CheckCircle sx={{ fontSize: '0.8rem !important' }} />}
                            sx={{ 
                              bgcolor: 'rgba(16,185,129,0.1)', 
                              color: '#10b981',
                              '.MuiChip-icon': {
                                color: '#10b981'
                              }
                            }}
                          />
                        )}
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                      No recent activity found. Start learning to see your progress!
                    </Typography>
                  )}
                </List>
              </Card>
            </Box>
          )}
          
          {tabValue === 1 && (
            <Box sx={{ p: 4 }}>
              <Typography variant="h6">Progress content</Typography>
            </Box>
          )}
          
          {tabValue === 2 && (
            <Box sx={{ p: 4 }}>
              <Typography variant="h6">Achievements content</Typography>
            </Box>
          )}
          
          {tabValue === 3 && (
            <Box sx={{ p: 4 }}>
              <Typography variant="h6">Saved content</Typography>
            </Box>
          )}
        </Box>
      </Paper>
      
      {/* Logout confirmation dialog */}
      <Dialog
        open={confirmLogout}
        onClose={cancelLogout}
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            borderRadius: 3,
            maxWidth: 400
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, pt: 3 }}>
          Sign Out
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to sign out of your account?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={cancelLogout}
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmLogoutAction}
            variant="contained"
            color="error"
            sx={{ 
              bgcolor: 'rgb(239,68,68)',
              '&:hover': {
                bgcolor: 'rgb(220,38,38)'
              }
            }}
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 