import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for settings
const SettingsContext = createContext();

// Custom hook to use the settings context
export const useSettings = () => {
  return useContext(SettingsContext);
};

// SettingsProvider component to provide settings context to its children
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
    chartType: 'line', // Default chart type
  });

  // Function to update a specific setting
  const updateSetting = (key, value) => {
    setSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
  };

  // Effect to update the document's class name based on the theme
  useEffect(() => {
    document.documentElement.className = settings.theme;
  }, [settings.theme]);

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext };
