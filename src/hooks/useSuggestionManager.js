import { useState, useEffect } from 'react';
import { getRandomActivity, activities } from '../data/activities';

const STORAGE_KEY = 'randomlyinspired_session';

export const useSuggestionManager = () => {
  const [currentActivity, setCurrentActivity] = useState(null);
  const [shownActivityIds, setShownActivityIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    totalShown: 0,
    acceptedCount: 0,
    rejectedCount: 0
  });

  // Load session data from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        setShownActivityIds(sessionData.shownActivityIds || []);
        setSessionStats(sessionData.sessionStats || {
          totalShown: 0,
          acceptedCount: 0,
          rejectedCount: 0
        });
      } catch (error) {
        console.error('Error loading session data:', error);
        // Reset if corrupted
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save session data to localStorage whenever it changes
  useEffect(() => {
    const sessionData = {
      shownActivityIds,
      sessionStats,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
  }, [shownActivityIds, sessionStats]);

  const getNewSuggestion = () => {
    setIsLoading(true);
    
    // Simulate a brief loading for better UX
    setTimeout(() => {
      const newActivity = getRandomActivity(shownActivityIds);
      
      if (newActivity) {
        setCurrentActivity(newActivity);
        setShownActivityIds(prev => [...prev, newActivity.id]);
        setSessionStats(prev => ({
          ...prev,
          totalShown: prev.totalShown + 1
        }));
      } else {
        // All activities have been shown
        setCurrentActivity(null);
      }
      
      setIsLoading(false);
    }, 500);
  };

  const acceptActivity = () => {
    if (currentActivity) {
      setSessionStats(prev => ({
        ...prev,
        acceptedCount: prev.acceptedCount + 1
      }));
      return currentActivity.id; // Return ID for navigation
    }
    return null;
  };

  const rejectActivity = () => {
    if (currentActivity) {
      setSessionStats(prev => ({
        ...prev,
        rejectedCount: prev.rejectedCount + 1
      }));
    }
    getNewSuggestion();
  };

  const resetSession = () => {
    setCurrentActivity(null);
    setShownActivityIds([]);
    setSessionStats({
      totalShown: 0,
      acceptedCount: 0,
      rejectedCount: 0
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  const getSessionProgress = () => {
    const totalActivities = activities.length;
    const remainingActivities = totalActivities - shownActivityIds.length;
    const progressPercentage = (shownActivityIds.length / totalActivities) * 100;
    
    return {
      totalActivities,
      shownCount: shownActivityIds.length,
      remainingActivities,
      progressPercentage: Math.round(progressPercentage),
      allActivitiesShown: remainingActivities === 0
    };
  };

  const hasActivitiesRemaining = () => {
    return shownActivityIds.length < activities.length;
  };

  return {
    currentActivity,
    isLoading,
    sessionStats,
    getNewSuggestion,
    acceptActivity,
    rejectActivity,
    resetSession,
    getSessionProgress,
    hasActivitiesRemaining
  };
};
