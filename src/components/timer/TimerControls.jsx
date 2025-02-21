import React from 'react';
import Button from '../common/Button'; // Import Button component

/**
 * TimerControls component to manage timer functionality.
 * @param customTime - The custom time set by the user.
 * @param setCustomTime - Function to update the custom time.
 * @param isRunning - Boolean indicating if the timer is running.
 * @param onStart - Function to start the timer.
 * @param onStop - Function to stop the timer.
 * @param onReset - Function to reset the timer.
 */
const TimerControls = ({ customTime, setCustomTime, isRunning, onStart, onStop, onReset }) => {
    return (
        <div className="timer-controls">
            <input
                type="number"
                value={customTime}
                onChange={(e) => setCustomTime(Number(e.target.value))}
                disabled={isRunning} // Disable input when timer is running
            />
            <Button onClick={isRunning ? onStop : onStart}>
                {isRunning ? 'Stop' : 'Start'}
            </Button>
            <Button onClick={onReset}>Restart</Button>
        </div>
    );
};

export default TimerControls;