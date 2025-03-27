import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

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
      rewards: [], // Initialize rewards array
    };
  });

  // Function to update a specific setting
  const updateSetting = useCallback((key, value) => {
    setSettings(prevSettings => ({ ...prevSettings, [key]: value }));
  }, []);

  // Function to add a session when the timer completes
  const addSession = useCallback((duration) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      sessions: [...prevSettings.sessions, { duration }],
      streak: prevSettings.streak + 1,
    }));
  }, []);

  // Add the current streak to historical streaks when the page is closed or refreshed
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (settings.streak > 0) {
        const newStreak = {
          streak: settings.streak,
          startDate: settings.streakStartDate || new Date().toISOString().split('T')[0],
          endDate: new Date().toISOString().split('T')[0],
        };
        const updatedStreaks = [...settings.historicalStreaks, newStreak];
        
        // Update localStorage directly instead of using setState
        const updatedSettings = {
          ...settings,
          historicalStreaks: updatedStreaks,
          streak: 0,
          streakStartDate: null
        };
        localStorage.setItem('settings', JSON.stringify(updatedSettings));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [settings]);

  // Debounce settings save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('settings', JSON.stringify(settings));
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [settings]);

  // Effect to update the document's class name based on the theme
  useEffect(() => {
    document.documentElement.className = settings.theme;
  }, [settings.theme]);

  const value = {
    settings,
    updateSetting,
    addSession
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext };
