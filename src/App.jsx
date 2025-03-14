import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/nav/NavBar';
import HomePage from './pages/HomePage';
import TimerPage from './pages/TimerPage';
import SettingsPanel from './components/settings/SettingsPanel';
import ProgressPage from './pages/ProgressPage';
import ErrorBoundary from './components/common/ErrorBoundary';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { NotificationProvider } from './context/NotificationContext';
import NotificationSystem from './components/feedback/NotificationSystem';
import LoadingBar from './components/common/LoadingBar';

/**
 * App component to provide the main structure of the application.
 */
const App = () => {
  return (
    <SettingsProvider>
      <NotificationProvider>
        <Router>
          <div>
            <NavBar />
            <ErrorBoundary>
              <MainApp />
            </ErrorBoundary>
            <NotificationSystem />
          </div>
        </Router>
      </NotificationProvider>
    </SettingsProvider>
  );
};

/**
 * MainApp component to provide the main content of the application.
 */
const MainApp = () => {
  const { settings } = useSettings();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading time
    return () => clearTimeout(timer);
  }, [location]); // Ensure the dependency array only includes 'location' ai gave me this remember to get rid of to fix

  return (
    <div className={`app ${settings.theme}`}>
      {loading && <LoadingBar />}
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/settings" element={<SettingsPanel />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
    </div>
  );
};

export default App;
