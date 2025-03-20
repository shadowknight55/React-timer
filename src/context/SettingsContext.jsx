import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for settings
const SettingsContext = createContext();

// Custom hook to use the settings context
export const useSettings = () => {
  return useContext(SettingsContext);
};

// SettingsProvider component to provide settings context to its children
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    // Load settings from localStorage or use default values
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    return savedSettings || {
      timerDuration: 25, // Default timer duration in minutes
      theme: 'light', // Default theme
      notifications: true, // Default notifications setting
      sound: true, // Default sound setting
      timerPresets: {
        focusTime: 25,
      },
      streak: 0, // Initial streak value
      streakStartDate: null, // Start date of the current streak
      sessions: [], // Array to store session durations
      chartType: 'line', // Default chart type
      historicalStreaks: [], // Ensure historicalStreaks is initialized as an empty array
    };
  });

  // Function to update a specific setting
  const updateSetting = (key, value) => {
    setSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
  };

  // Add the current streak to historical streaks when the page is closed or refreshed
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (settings.streak > 0) {
        const newStreak = {
          streak: settings.streak,
          startDate: settings.streakStartDate || new Date().toISOString().split('T')[0], // Use the stored start date or today's date
          endDate: new Date().toISOString().split('T')[0], // Use today's date as the end date
        };
        const updatedStreaks = [...settings.historicalStreaks, newStreak];
        setSettings((prevSettings) => ({
          ...prevSettings,
          historicalStreaks: updatedStreaks,
          streak: 0, // Reset current streak
          streakStartDate: null, // Reset streak start date
        }));
        localStorage.setItem(
          'settings',
          JSON.stringify({ ...settings, historicalStreaks: updatedStreaks, streak: 0, streakStartDate: null })
        );
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [settings]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

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
