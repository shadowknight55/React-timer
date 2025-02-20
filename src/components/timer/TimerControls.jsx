import React from 'react';
import Button from '../common/Button'; // Import Button component

// TimerControls component to manage timer functionality
const TimerControls = ({ customTime, setCustomTime, isRunning, onStart, onStop, onReset }) => {
    return (
        <div className="timer-controls">
            <input
                type="number"
                value={customTime}
                onChange={(e) => setCustomTime(Number(e.target.value))}
                disabled={isRunning} // Disable input when timer is running
            />
            <Button onClick={onStart} disabled={isRunning}>Start</Button>
            <Button onClick={onStop} disabled={!isRunning}>Stop</Button>
            <Button onClick={onReset}>Reset</Button>
        </div>
    );
};

export default TimerControls;