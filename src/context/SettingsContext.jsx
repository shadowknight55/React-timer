import React, { createContext, useState, useContext, useEffect } from 'react';

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
    sessions: [], // Array to store session durations
  });

  const updateSetting = (key, value) => {
    setSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
  };

  const incrementStreak = () => {
    setSettings((prevSettings) => ({ ...prevSettings, streak: prevSettings.streak + 1 }));
  };

  useEffect(() => {
    document.documentElement.className = settings.theme;
  }, [settings.theme]);

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, incrementStreak }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext };
