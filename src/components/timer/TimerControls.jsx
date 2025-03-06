import React from 'react';
import Button from '../common/Button'; // Import Button component
import './TimerControls.css';

/**
 * TimerControls component to manage timer functionality.
 * @param isRunning - Boolean indicating if the timer is running.
 * @param onStart - Function to start the timer.
 * @param onStop - Function to stop the timer.
 * @param onReset - Function to reset the timer.
 */
const TimerControls = ({ isRunning, onStart, onStop, onReset }) => {
  return (
    <div className="timer-controls">
      <Button onClick={isRunning ? onStop : onStart} className="control-button">
        {isRunning ? 'Stop' : 'Start'}
      </Button>
      <Button onClick={onReset} className="control-button">Restart</Button>
    </div>
  );
};

export default TimerControls;