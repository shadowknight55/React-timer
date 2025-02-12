import React, { useState, useEffect } from 'react';
import './App.css'; // Importing the CSS for styling
import Card from './components/common/Card';

const App = () => {
    const [customTime, setCustomTime] = useState(25); // State for custom timer input
    const [darkMode, setDarkMode] = useState(false); // State for dark mode
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning && (customTime * 60) > 0) {
            timer = setInterval(() => {
                setCustomTime((prev) => {
                    if (prev > 0) return prev - 1;
                    setIsRunning(false);
                    return 0;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, customTime]);

    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setCustomTime(25); // Reset to 25 minutes
    };

    return ( 
        <div className={darkMode ? 'dark-mode' : ''}> {/* Apply dark mode class */}
            <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button> {/* Button to toggle dark mode */}
            <h1>Focus Timer</h1> {/* Title for the timer */}
            <div>
                <input
                    type="number"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)} 
                    placeholder="Set Timer (minutes)" 
                /> {/* Input for custom timer */}
                <Card 
                    timerValue={customTime * 60} // Adjust timer value based on custom time
                    onStart={handleStart} 
                    onStop={handleStop} 
                    onReset={handleReset} 
                />
            </div>
        </div>
    ); 
};

export default App;
