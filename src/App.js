import React, { useState, useEffect } from 'react';
import './App.css'; // Importing the CSS for styling
import TimerControls from './components/common/TimerControls'; // Import TimerControls
import TimerDisplay from './components/common/TimerDisplay'; // Import TimerDisplay

const App = () => { 
    const [customTime, setCustomTime] = useState(25); // Set custom time to 25 minutes
    const [isRunning, setIsRunning] = useState(false); 
    const [seconds, setSeconds] = useState(0); // Start at 0 seconds
    const [minutes, setMinutes] = useState(customTime); // Track minutes separately

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
        return () => clearInterval(timer); 
    }, [isRunning, seconds, minutes]); 

    const onStart = () => { 
        setIsRunning(true); 
        setMinutes(customTime); // Set minutes based on custom time when starting
        setSeconds(60); // Set seconds to 60 when starting
    };

    const onStop = () => setIsRunning(false); // Define onStop function

    const onReset = () => { 
        setIsRunning(false); 
        setCustomTime(25); // Reset custom time to 25 minute
        setMinutes(25); // Reset minutes to 25
        setSeconds(0); // Reset seconds to 0
    }; // Define onReset function

    return ( 
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
