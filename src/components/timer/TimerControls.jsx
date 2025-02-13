import React from 'react';

const TimerControls = ({ onStart, onStop, onReset, customTime, setCustomTime, isRunning }) => { 
    // TimerControls component to manage timer actions

    return ( 
        <div> 
            {/* Timer input field */}
            <input 
                type="number"
                value={customTime}
                onChange={(e) => {
                    if (!isRunning) {
                        const value = e.target.value; // Get the input value
                        console.log(`Custom time changed to: ${value}`); // Log the new custom time
                        setCustomTime(Math.max(0, value)); // Ensure the value is non-negative
                    }
                }} 
                placeholder="Set Timer (minutes)"  // Placeholder for timer input
            />
            {/* Container for timer control buttons */}
            <button onClick={onStart}>Start</button> 
            {/* Button to start the timer */}
            <button onClick={onStop}>Stop</button> 
            {/* Button to stop the timer */}
            <button onClick={onReset}>Reset</button> 
            {/* Button to reset the timer */}
        </div> 
    ); 
}; 

export default TimerControls; // Export the TimerControls component
