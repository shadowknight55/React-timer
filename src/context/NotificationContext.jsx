import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useSettings } from './SettingsContext';

// Create a context for notifications
const NotificationContext = createContext();

// Custom hook to use the notification context
export const useNotification = () => {
  return useContext(NotificationContext);
};

// List of all possible rewards
const allRewards = [
  'First Timer: Started the timer for the first time!',
  'Consistency Champ: 5-session streak! Keep it up!',
  'Double Digits: 10-session streak! Great job!',
  'Marathoner: 20-session streak! Amazing!',
  'Procrastinator: Started and stopped the timer 5 times!',
  'Persistent Procrastinator: Started and stopped the timer 15 times!',
  'Half Hour Hero: Completed a 30-minute session!',
  'Hour of Power: Completed a 60-minute session!',
  'Daily Grinder: Used the timer every day for a week!',
  'Monthly Master: Used the timer every day for a month!'
];

// NotificationProvider component to provide notification context to its children
export const NotificationProvider = ({ children }) => {
  const { settings, updateSetting } = useSettings();
  const [notifications, setNotifications] = useState([]);
  
  const [rewards, setRewards] = useState(() => {
    // First check settings, then localStorage as fallback
    if (settings.rewards && settings.rewards.length > 0) {
      return settings.rewards;
    }
    const savedRewards = localStorage.getItem('rewards');
    if (savedRewards) {
      return JSON.parse(savedRewards);
    }
    return [];
  });

  const [startStopCount, setStartStopCount] = useState(() => {
    const savedCount = localStorage.getItem('startStopCount');
    return savedCount ? JSON.parse(savedCount) : 0;
  });

  // Save rewards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rewards', JSON.stringify(rewards));
  }, [rewards]);

  // Save start/stop count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('startStopCount', JSON.stringify(startStopCount));
  }, [startStopCount]);

  // Function to add a notification
  const addNotification = useCallback((message) => {
    const id = Date.now();
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, message },
    ]);
  }, []);

  // Function to remove a notification
  const removeNotification = useCallback((id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  }, []);

  // Function to add a reward
  const addReward = useCallback((reward) => {
    if (!rewards.includes(reward)) {
      setRewards(prevRewards => {
        const newRewards = [...prevRewards, reward];
        // Update both localStorage and settings at once
        localStorage.setItem('rewards', JSON.stringify(newRewards));
        updateSetting('rewards', newRewards);
        return newRewards;
      });
      addNotification(`New reward: ${reward}`);
    }
  }, [rewards, updateSetting, addNotification]);

  // Function to reset rewards
  const resetRewards = useCallback(() => {
    setRewards([]);
    localStorage.setItem('rewards', JSON.stringify([]));
    // Update settings in the next tick to prevent render loop
    Promise.resolve().then(() => {
      updateSetting('rewards', []);
    });
    addNotification('Rewards have been reset.');
  }, [updateSetting, addNotification]);

  // Function to increment the streak
  const incrementStreak = useCallback(() => {
    const newStreak = settings.streak + 1;
    updateSetting('streak', newStreak);

    // Add rewards based on the streak
    if (newStreak === 5) {
      addReward('Consistency Champ: 5-session streak! Keep it up!');
    } else if (newStreak === 10) {
      addReward('Double Digits: 10-session streak! Great job!');
    } else if (newStreak === 20) {
      addReward('Marathoner: 20-session streak! Amazing!');
    }
  }, [settings.streak, updateSetting, addReward]);

  // Function to increment the start/stop count
  const incrementStartStopCount = useCallback(() => {
    setStartStopCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount === 5) {
        addReward('Procrastinator: Started and stopped the timer 5 times!');
      }
      if (newCount === 15) {
        addReward('Persistent Procrastinator: Started and stopped the timer 15 times!');
      }
      return newCount;
    });
  }, [addReward]);

  // Function to check and add session duration rewards
  const checkSessionDurationRewards = useCallback((sessionDuration) => {
    if (sessionDuration >= 30 * 60 && !rewards.includes('Half Hour Hero: Completed a 30-minute session!')) {
      addReward('Half Hour Hero: Completed a 30-minute session!');
    }
    if (sessionDuration >= 60 * 60 && !rewards.includes('Hour of Power: Completed a 60-minute session!')) {
      addReward('Hour of Power: Completed a 60-minute session!');
    }
  }, [rewards, addReward]);

  // Function to check and add daily usage rewards
  const checkDailyUsageRewards = useCallback(() => {
    const today = new Date().toDateString();
    const lastSessionDate = settings.sessions.length > 0 ? new Date(settings.sessions[settings.sessions.length - 1].timestamp).toDateString() : null;
    
    if (lastSessionDate !== today) {
      const newSession = { duration: 0, timestamp: new Date() };
      const updatedSessions = [...settings.sessions, newSession];
      updateSetting('sessions', updatedSessions);
    }

    const dailyUsage = settings.sessions.reduce((acc, session) => {
      const date = new Date(session.timestamp).toDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const dailyUsageCount = Object.keys(dailyUsage).length;

    if (dailyUsageCount >= 7 && !rewards.includes('Daily Grinder: Used the timer every day for a week!')) {
      addReward('Daily Grinder: Used the timer every day for a week!');
    }
    if (dailyUsageCount >= 30 && !rewards.includes('Monthly Master: Used the timer every day for a month!')) {
      addReward('Monthly Master: Used the timer every day for a month!');
    }
  }, [settings.sessions, rewards, updateSetting, addReward]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    rewards,
    addReward,
    resetRewards,
    incrementStreak,
    allRewards,
    incrementStartStopCount,
    checkSessionDurationRewards,
    checkDailyUsageRewards
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext };
