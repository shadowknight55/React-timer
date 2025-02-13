import React, { useEffect } from 'react';

// TimerControls component to manage timer functionality
const TimerControls = ({ onStart, onStop, onReset, customTime, setCustomTime, isRunning, minutes, seconds, setMinutes, setSeconds }) => {
    useEffect(() => {
        let timer;
        if (isRunning && (minutes > 0 || seconds > 0)) {
            console.log("Timer is running. Minutes left:", minutes, "Seconds left:", seconds);
            timer = setInterval(() => {
                if (seconds === 0) {
                    setMinutes(prev => prev - 1); // Decrease minutes
                    setSeconds(60); // Reset seconds to 60
                } else {
                    setSeconds(prev => prev - 1); // Decrease seconds
                }
            }, 1000);
        }
        return () => clearInterval(timer); // Cleanup the timer on component unmount
    }, [isRunning, seconds, minutes]);

    return (
        <div className="timer-controls">
            <input
                type="number"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                disabled={isRunning} // Disable input when timer is running
            />
            <button onClick={onStart} disabled={isRunning}>Start</button>
            <button onClick={onStop} disabled={!isRunning}>Stop</button>
            <button onClick={onReset}>Reset</button>
        </div>
    );
};

export default TimerControls;
