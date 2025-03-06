import React from 'react';
import { useSettings } from '../../context/SettingsContext';

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
    // Display the formatted time
    <div className={`timer-display ${settings.theme}`}>
      <h2>{formattedMinutes}:{formattedSeconds}</h2>
    </div>
  );
};

export default TimerDisplay;