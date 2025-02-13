import React from 'react';

const TimerDisplay = ({ minutes, seconds }) => {
    console.log("TimerDisplay - Minutes:", minutes, "Seconds:", seconds);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return (
        <div>
            <h2>{formattedMinutes}:{formattedSeconds}</h2>
        </div>
    );
};

export default TimerDisplay;
