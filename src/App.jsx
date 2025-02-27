import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/nav/NavBar';
import HomePage from './pages/HomePage';
import Card from './components/common/Card';
import SettingsPanel from './components/settings/SettingsPanel';
import ProgressPage from './pages/ProgressPage';
import ErrorBoundary from './components/common/ErrorBoundary';
import { SettingsProvider } from './components/settings/SettingsContext';

const App = () => {
  return (
    <SettingsProvider>
      <Router>
        <div>
          <NavBar />
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/timer" element={<Card />} />
              <Route path="/settings" element={<SettingsPanel />} />
              <Route path="/progress" element={<ProgressPage />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </Router>
    </SettingsProvider>
  );
};

export default App;
