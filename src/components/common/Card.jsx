import React from 'react';
import TimerDisplay from '../timer/TimerDisplay';
import TimerControls from '../timer/TimerControls';

const Card = ({ timerValue, onStart, onStop, onReset }) => {
    return (
        <div className="card">
            <TimerDisplay timerValue={timerValue} />
            <TimerControls onStart={onStart} onStop={onStop} onReset={onReset} />
        </div>
    );
};

export default Card;
