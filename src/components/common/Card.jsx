import React from 'react';
import TimerDisplay from '../timer/TimerDisplay';
import TimerControls from '../timer/TimerControls';

const Card = ({ timerValue, onStart, onStop, onReset }) => { 
    // Card component to display timer and controls

    // Render the card containing timer display and controls
    return ( 
        <div className="card"> 
            {/* Container for timer display and controls */}

            <TimerDisplay timerValue={timerValue} /> 
            {/* Display the current timer value */}

            <TimerControls onStart={onStart} onStop={onStop} onReset={onReset} /> 
            {/* Controls for starting, stopping, and resetting the timer */}
        </div> 
    ); // End of Card component
}; // 

export default Card; // Export the Card component
