import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// Create a context for settings
const SettingsContext = createContext();

// Custom hook to use the settings context
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

// SettingsProvider component to provide settings context to its children
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    return savedSettings || {
      timerDuration: 25,
      theme: 'light',
      notifications: true,
      sound: true,
      timerPresets: {
        focusTime: 25,
      },
      streak: 0,
      streakStartDate: null,
      sessions: [], // Empty array for actual session data
      chartType: 'line',
      chartTimePeriod: 'days',
      historicalStreaks: [], // Empty array for actual streak history
      rewards: [], // Empty array for actual rewards
    };
  });

  // Function to update a specific setting
  const updateSetting = useCallback((key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('settings', JSON.stringify(newSettings));
      return newSettings;
    });
  }, []);

  // Function to update multiple settings at once
  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => {
      const updatedSettings = { ...prev, ...newSettings };
      localStorage.setItem('settings', JSON.stringify(updatedSettings));
      return updatedSettings;
    });
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
    updateSettings,
    addSession
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext };
