import React, { createContext, useState, useContext, useEffect } from 'react';
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
    const savedRewards = localStorage.getItem('rewards');
    return savedRewards ? JSON.parse(savedRewards) : settings.rewards || [];
  });
  const [startStopCount, setStartStopCount] = useState(() => {
    const savedCount = localStorage.getItem('startStopCount');
    return savedCount ? JSON.parse(savedCount) : 0;
  });

  // Save rewards to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('rewards', JSON.stringify(rewards));
  }, [rewards]);

  // Save start/stop count to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('startStopCount', JSON.stringify(startStopCount));
  }, [startStopCount]);

  // Function to add a notification
  const addNotification = (message) => {
    const id = Date.now();
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, message },
    ]);
  };

  // Function to remove a notification
  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  // Function to add a reward
  const addReward = (reward) => {
    if (!rewards.includes(reward)) {
      setRewards((prevRewards) => [...prevRewards, reward]);
      addNotification(`New reward: ${reward}`);
      updateSetting('rewards', [...rewards, reward]);
    }
  };

  // Function to reset rewards
  const resetRewards = () => {
    setRewards([]);
    updateSetting('rewards', []);
    addNotification('Rewards have been reset.');
  };

  // Function to increment the streak
  const incrementStreak = () => {
    updateSetting('streak', settings.streak + 1);
    const newStreak = settings.streak + 1;
    const newRewards = [...rewards];

    // Add rewards based on the streak
    if (newStreak === 5 && !newRewards.includes('Consistency Champ: 5-session streak! Keep it up!')) {
      newRewards.push('Consistency Champ: 5-session streak! Keep it up!');
    } else if (newStreak === 10 && !newRewards.includes('Double Digits: 10-session streak! Great job!')) {
      newRewards.push('Double Digits: 10-session streak! Great job!');
    } else if (newStreak === 20 && !newRewards.includes('Marathoner: 20-session streak! Amazing!')) {
      newRewards.push('Marathoner: 20-session streak! Amazing!');
    }

    setRewards(newRewards);
    updateSetting('rewards', newRewards);
  };

  // Function to increment the start/stop count
  const incrementStartStopCount = () => {
    const newCount = startStopCount + 1;
    setStartStopCount(newCount);
    if (newCount === 5) {
      addReward('Procrastinator: Started and stopped the timer 5 times!');
    }
    if (newCount === 15) {
      addReward('Persistent Procrastinator: Started and stopped the timer 15 times!');
    }
  };

  // Function to check and add session duration rewards
  const checkSessionDurationRewards = (sessionDuration) => {
    if (sessionDuration >= 30 * 60 && !rewards.includes('Half Hour Hero: Completed a 30-minute session!')) {
      addReward('Half Hour Hero: Completed a 30-minute session!');
    }
    if (sessionDuration >= 60 * 60 && !rewards.includes('Hour of Power: Completed a 60-minute session!')) {
      addReward('Hour of Power: Completed a 60-minute session!');
    }
  };

  // Function to check and add daily usage rewards
  const checkDailyUsageRewards = () => {
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
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, rewards, addReward, resetRewards, incrementStreak, allRewards, incrementStartStopCount, checkSessionDurationRewards, checkDailyUsageRewards }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext };
