import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import './TimerDisplay.css';

/**
 * TimerDisplay component to show the remaining time.
 * @param minutes - The remaining minutes.
 * @param seconds - The remaining seconds.
 */
const TimerDisplay = ({ minutes, seconds }) => {
  const { settings } = useSettings();
  const formattedMinutes = String(minutes).padStart(2, '0'); // Format minutes
  const formattedSeconds = String(seconds).padStart(2, '0'); // Format seconds

  return (
    <div className={`timer-display ${settings.theme}`}>
      <div className="time">
        <span className="minutes">{formattedMinutes}</span>
        <span className="colon">:</span>
        <span className="seconds">{formattedSeconds}</span>
      </div>
    </div>
  );
};

export default TimerDisplay;