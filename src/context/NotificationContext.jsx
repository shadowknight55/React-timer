import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSettings } from './SettingsContext';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

const allRewards = [
  'Started the timer for the first time!',
  '5-session streak! Keep it up!',
  '10-session streak! Great job!',
  '20-session streak! Amazing!',
  'Started and stopped the timer 5 times!',
  'Started and stopped the timer 15 times!'
];

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

  useEffect(() => {
    localStorage.setItem('rewards', JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem('startStopCount', JSON.stringify(startStopCount));
  }, [startStopCount]);

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, message },
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const addReward = (reward) => {
    if (!rewards.includes(reward)) {
      setRewards((prevRewards) => [...prevRewards, reward]);
      addNotification(`New reward: ${reward}`);
      updateSetting('rewards', [...rewards, reward]);
    }
  };

  const incrementStreak = () => {
    updateSetting('streak', settings.streak + 1);
    const newStreak = settings.streak + 1;
    const newRewards = [...rewards];

    // Add rewards based on the streak
    if (newStreak === 5 && !newRewards.includes('5-session streak! Keep it up!')) {
      newRewards.push('5-session streak! Keep it up!');
    } else if (newStreak === 10 && !newRewards.includes('10-session streak! Great job!')) {
      newRewards.push('10-session streak! Great job!');
    } else if (newStreak === 20 && !newRewards.includes('20-session streak! Amazing!')) {
      newRewards.push('20-session streak! Amazing!');
    }

    setRewards(newRewards);
    updateSetting('rewards', newRewards);
  };

  const incrementStartStopCount = () => {
    const newCount = startStopCount + 1;
    setStartStopCount(newCount);
    if (newCount === 5) {
      addReward('Started and stopped the timer 5 times!');
    }
    if (newCount === 15) {
      addReward('Started and stopped the timer 15 times!');
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, rewards, addReward, incrementStreak, allRewards, incrementStartStopCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext };
