import React from 'react';

const TimerControls = ({ onStart, onStop, onReset }) => { 
    // TimerControls component to manage timer actions

    // Render the timer control buttons
    return ( 
        <div> 
            {/* Container for timer control buttons */}

            <button onClick={onStart}>Start</button> 
            {/* Button to start the timer */}

            <button onClick={onStop}>Stop</button> 
            {/* Button to stop the timer */}

            <button onClick={onReset}>Reset</button> 
            {/* Button to reset the timer */}
        </div> 
    ); // End of TimerControls component
}; 

export default TimerControls; // Export the TimerControls component
