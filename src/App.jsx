import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/nav/NavBar';
import HomePage from './pages/HomePage';
import Card from './components/common/Card';
import SettingsPanel from './components/settings/SettingsPanel';
import ProgressPage from './pages/ProgressPage';
import ErrorBoundary from './components/common/ErrorBoundary';
import { SettingsProvider, useSettings } from './context/SettingsContext';

const App = () => {
  return (
    <SettingsProvider>
      <Router>
        <div>
          <NavBar />
          <ErrorBoundary>
            <MainApp />
          </ErrorBoundary>
        </div>
      </Router>
    </SettingsProvider>
  );
};

const MainApp = () => {
  const { settings } = useSettings();

  return (
    <div className={`app ${settings.theme}`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timer" element={<Card />} />
        <Route path="/settings" element={<SettingsPanel />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
    </div>
  );
};

export default App;
