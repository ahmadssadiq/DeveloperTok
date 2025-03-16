export interface Lesson {
  _id: string;
  title: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  content: {
    type: 'video' | 'text';
    url: string;
    thumbnailUrl: string;
  };
  instructor: {
    name: string;
    profileId: string;
  };
  views: number;
  likes: number;
  challengeId: string;
}

export interface Challenge {
  _id: string;
  lessonId: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'code' | 'quiz';
  language: string;
  starterCode: string;
  solution: string;
  hints: string[];
  testCases: {
    input: string;
    expected: boolean;
    explanation: string;
  }[];
  timeLimit: number;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  preferences: {
    favoriteTopics: string[];
    difficulty: string;
    emailNotifications: boolean;
  };
  progress: {
    lessonsCompleted: number;
    challengesSolved: number;
    currentStreak: number;
    longestStreak: number;
    totalPoints: number;
    level: number;
    badges: number;
    lastActive?: Date;
  };
  recentActivity?: Array<{
    type: string;
    title: string;
    date: Date | string;
    completed: boolean;
    itemId?: string;
  }>;
  createdAt?: Date;
} 