import React from 'react';
import { useSettings } from '../../context/SettingsContext';

// Notification component to display messages
const Notification = ({ message, onClose }) => {
  const { settings } = useSettings();

  return (
    <div className={`notification ${settings.theme}`}>
      <p>{message}</p>
      <button onClick={onClose} className={settings.theme}>Close</button>
    </div>
  );
};

export default Notification;
