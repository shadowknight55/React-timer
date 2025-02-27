import React, { createContext, useState, useContext } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    timerDuration: 25, // Default timer duration in minutes
    theme: 'light', // Default theme
    notifications: true, // Default notifications setting
    sound: true, // Default sound setting
    timerPresets: {
      focusTime: 25,
    },
    streak: 0, // Initial streak value
  });

  const updateSetting = (key, value) => {
    setSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
  };

  const incrementStreak = () => {
    setSettings((prevSettings) => ({ ...prevSettings, streak: prevSettings.streak + 1 }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, incrementStreak }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext };
