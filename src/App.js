import React, { useState, useEffect } from 'react';
import './App.css'; // Importing the CSS for styling
import Card from './components/common/Card';

const App = () => { 
    // Main application component
    // State for custom timer input in minutes
    const [customTime, setCustomTime] = useState(25); 
    // State for dark mode
    const [darkMode, setDarkMode] = useState(false); 
    // State to track if the timer is running
    const [isRunning, setIsRunning] = useState(false); 
    // State for seconds countdown
    const [seconds, setSeconds] = useState(60); 

    // Effect to handle the countdown logic
    useEffect(() => { 
        let timer; // Variable to hold the timer interval
        // Start the timer if it is running and custom time is greater than 0
        if (isRunning && customTime > 0) { 
            // Set an interval to update the timer every second
            timer = setInterval(() => { 
                // If seconds are greater than 0, decrement seconds
                if (seconds > 0) { 
                    setSeconds(prev => prev - 1); // Decrement seconds
                } else { 
                    // Decrement minutes and reset seconds to 60
                    setCustomTime(prev => prev - 1); 
                    setSeconds(60); // Reset seconds to 60
                }
            }, 1000); // Update every second
        }
        // Cleanup function to clear the timer interval
        return () => clearInterval(timer); 
    }, [isRunning, seconds, customTime]); 

    // Function to handle starting the timer
    const handleStart = () => { 
        // Start the timer if custom time is greater than 0
        if (customTime > 0) { 
            setIsRunning(true); // Set running state to true
            setSeconds(60); // Reset seconds to 60 when starting
        } // Closing brace added here
    };
    // Function to handle stopping the timer
    const handleStop = () => setIsRunning(false); 
    // Function to handle resetting the timer
    const handleReset = () => { 
        setIsRunning(false); // Stop the timer
        setCustomTime(25); // Reset to 25 minutes
        setSeconds(60); // Reset seconds to 60
    };

    // Render the application UI
    return ( 
        <div className={darkMode ? 'dark-mode' : ''}> {/* Apply dark mode class */} 
            <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button> {/* Button to toggle dark mode */} 
            <h1>Focus Timer</h1> {/* Title for the timer */} 
            <div> 
                <input 
                    type="number"
                    value={customTime}
                    onChange={(e) => {
                        if (!isRunning) {
                            setCustomTime(e.target.value);
                        }
                    }} 
                    placeholder="Set Timer (minutes)"  // Placeholder for timer input
                /> {/* Input for custom timer */} 
                <Card 
                    timerValue={customTime * 60 + seconds} // Convert minutes to seconds for display 
                    onStart={handleStart}  // Pass start handler to Card
                    onStop={handleStop}  // Pass stop handler to Card
                    onReset={handleReset}  // Pass reset handler to Card
                /> 
            </div> 
        </div> 
    ); // End of return statement
}; // End of App component

export default App; // Export the App component
