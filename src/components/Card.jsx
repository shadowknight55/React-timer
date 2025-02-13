import React, { useState } from "react";
import TimerDisplay from "./timer/TimerDisplay";
import TimerControls from "./timer/TimerControls";

const Card = () => {
    // State to manage custom time for the timer
    const [customTime, setCustomTime] = useState(25); // Set custom time to 25 minutes

    // State to manage the running status of the timer
    const [isRunning, setIsRunning] = useState(false); // State to manage if the timer is running
    const [seconds, setSeconds] = useState(0); // Start at 0 seconds

    // State to track the remaining minutes
    const [minutes, setMinutes] = useState(customTime); // Track minutes separately

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
        // Main render of the Card component
        <div className="card">
            <TimerDisplay 
                minutes={minutes}
                seconds={seconds}
            />
            <TimerControls 
                onStart={onStart} 
                onStop={onStop} 
                onReset={onReset} 
                customTime={customTime}
                setCustomTime={setCustomTime}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                minutes={minutes}
                setMinutes={setMinutes}
                seconds={seconds}
                setSeconds={setSeconds}
            />
        </div>
    );
};

export default Card;
