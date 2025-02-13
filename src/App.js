import React, { useState } from 'react';
import './App.css'; // Importing the CSS for styling
import Card from './components/Card'; 
const App = () => {
    // State to manage custom time for the timer
    const [customTime, setCustomTime] = useState(25); // Set custom time to 25 minutes

    // State to manage the running status of the timer
    const [isRunning, setIsRunning] = useState(false); // State to manage if the timer is running
    const [seconds, setSeconds] = useState(0); // Start at 0 seconds

    // State to track the remaining minutes
    const [minutes, setMinutes] = useState(customTime); // Track minutes separately

    return (
        // Main render of the App component
        <div> 
            <h1>Focus Timer</h1> 
            <Card
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

export default App;
