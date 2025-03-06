import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSettings } from './SettingsContext';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const { settings, updateSetting } = useSettings();
  const [notifications, setNotifications] = useState([]);
  const [rewards, setRewards] = useState(settings.rewards || []);

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
    setRewards((prevRewards) => [...prevRewards, reward]);
    addNotification(`New reward: ${reward}`);
    updateSetting('rewards', [...rewards, reward]);
  };

  const incrementStreak = () => {
    updateSetting('streak', settings.streak + 1);
    const newStreak = settings.streak + 1;
    const newRewards = [...rewards];

    // Add rewards based on the streak
    if (newStreak === 5) {
      newRewards.push('5-session streak! Keep it up!');
    } else if (newStreak === 10) {
      newRewards.push('10-session streak! Great job!');
    } else if (newStreak === 20) {
      newRewards.push('20-session streak! Amazing!');
    }

    setRewards(newRewards);
    updateSetting('rewards', newRewards);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, rewards, addReward, incrementStreak }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext };
