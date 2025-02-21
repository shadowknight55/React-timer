import React from 'react';

/**
 * TimerDisplay component to show the remaining time.
 * @param minutes - The remaining minutes.
 * @param seconds - The remaining seconds.
 */
const TimerDisplay = ({ minutes, seconds }) => {
    console.log("TimerDisplay - Minutes:", minutes, "Seconds:", seconds);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return (
        // Display the formatted time
        <div>
            <h2>{formattedMinutes}:{formattedSeconds}</h2>
        </div>
    );
};

export default TimerDisplay;