import React, { useState, useEffect } from 'react';

const TimerDisplay = ({ timerValue }) => {
    const formatTime = (time) => {
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div>
            <h1>{formatTime(timerValue)}</h1>
        </div>
    );
};


export default TimerDisplay;
