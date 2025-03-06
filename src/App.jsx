import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const MainApp = () => {
  const { settings } = useSettings();

  return (
    <div className={`app ${settings.theme}`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/settings" element={<SettingsPanel />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
    </div>
  );
};

export default App;
