import React, { useEffect } from 'react';

// TimerControls component to manage timer functionality
const TimerControls = ({ customTime, setCustomTime, isRunning, setIsRunning, minutes, setMinutes, seconds, setSeconds }) => {
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

    // Function to start the timer
    const onStart = () => {
        setIsRunning(true); 
        setMinutes(customTime); // Set minutes based on custom time when starting
        setSeconds(60); // Set seconds to 60 when starting
    };

    // Function to stop the timer
    const onStop = () => setIsRunning(false); // Stop the timer

    // Function to reset the timer
    const onReset = () => {
        setIsRunning(false); 
        setCustomTime(25); // Reset custom time to 25 minutes
        setMinutes(25); // Reset minutes to 25
        setSeconds(0); // Reset seconds to 0
    };

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