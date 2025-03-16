import axios from 'axios';

/**
 * Updates user progress after completing a lesson
 * @param lessonId The ID of the completed lesson
 * @param lessonTitle The title of the completed lesson
 * @param pointsEarned The number of points earned for completing the lesson
 */
export const completeLesson = async (lessonId: string, lessonTitle: string, pointsEarned: number = 50) => {
  try {
    const response = await axios.get('/api/user');
    const userData = response.data;
    
    // Update progress
    const updatedProgress = {
      lessonsCompleted: userData.progress.lessonsCompleted + 1,
      totalPoints: userData.progress.totalPoints + pointsEarned,
      currentStreak: userData.progress.currentStreak + 1,
      activityItem: {
        type: 'lesson',
        title: lessonTitle,
        completed: true,
        itemId: lessonId
      }
    };
    
    // Send update to server
    await axios.post('/api/user/progress', updatedProgress);
    
    return true;
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    return false;
  }
};

/**
 * Updates user progress after completing a challenge
 * @param challengeId The ID of the completed challenge
 * @param challengeTitle The title of the completed challenge
 * @param pointsEarned The number of points earned for completing the challenge
 */
export const completeChallenge = async (challengeId: string, challengeTitle: string, pointsEarned: number = 100) => {
  try {
    const response = await axios.get('/api/user');
    const userData = response.data;
    
    // Update progress
    const updatedProgress = {
      challengesSolved: userData.progress.challengesSolved + 1,
      totalPoints: userData.progress.totalPoints + pointsEarned,
      currentStreak: userData.progress.currentStreak + 1,
      activityItem: {
        type: 'challenge',
        title: challengeTitle,
        completed: true,
        itemId: challengeId
      }
    };
    
    // Send update to server
    await axios.post('/api/user/progress', updatedProgress);
    
    return true;
  } catch (error) {
    console.error('Error updating challenge progress:', error);
    return false;
  }
};

/**
 * Awards a badge to the user
 * @param badgeName The name of the badge
 */
export const awardBadge = async (badgeName: string) => {
  try {
    const response = await axios.get('/api/user');
    const userData = response.data;
    
    // Update badges count
    const updatedProgress = {
      badges: userData.progress.badges + 1,
      activityItem: {
        type: 'badge',
        title: `Earned ${badgeName} badge`,
        completed: true
      }
    };
    
    // Send update to server
    await axios.post('/api/user/progress', updatedProgress);
    
    return true;
  } catch (error) {
    console.error('Error awarding badge:', error);
    return false;
  }
}; 