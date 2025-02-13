import React, { useState, useEffect } from 'react';
import './App.css'; 
import TimerControls from './components/TimerControls'; 
import TimerDisplay from './components/TimerDisplay'; 

const App = () => {
    // State to manage custom time for the timer
    const [customTime, setCustomTime] = useState(25); // Set custom time to 25 minutes

    // State to manage the running status of the timer
    const [isRunning, setIsRunning] = useState(false); // State to manage if the timer is running
    const [seconds, setSeconds] = useState(0); // Start at 0 seconds

    // State to track the remaining minutes
    const [minutes, setMinutes] = useState(customTime); // Track minutes separately

    // Effect to handle the timer countdown

    useEffect(() => {
        let timer; // Variable to hold the timer interval
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

    const onStart = () => {
        // Start the timer and set initial values
        setIsRunning(true); 
        setMinutes(customTime); // Set minutes based on custom time when starting
        setSeconds(60); // Set seconds to 60 when starting
    };

    const onStop = () => setIsRunning(false); // Stop the timer

    const onReset = () => {
        // Reset the timer to initial values
        setIsRunning(false); 
        setCustomTime(25); // Reset custom time to 25 minute
        setMinutes(25); // Reset minutes to 25
        setSeconds(0); // Reset seconds to 0
    }; 

    return (
        // Main render of the App component
        <div> 
            <h1>Focus Timer</h1> 
            <TimerDisplay 
                minutes={minutes} // Display minutes
                seconds={isRunning ? seconds : 0} // Show seconds only when running
            /> 
            <TimerControls 
                onStart={onStart} 
                onStop={onStop} // Pass onStop function
                onReset={onReset} // Pass onReset function
                customTime={customTime} 
                setCustomTime={setCustomTime} 
                isRunning={isRunning} 
            /> 
        </div> 
    ); 
}; 

export default App;
