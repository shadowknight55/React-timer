import React from 'react';
import useTimer from '../../hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';

const TimerState = ({ initialTime }) => {
    const {
        customTime,
        setCustomTime,
        isRunning,
        onStart,
        onStop,
        onReset,
        minutes,
        seconds
    } = useTimer(initialTime);

    return (
        <div>
            <TimerDisplay minutes={minutes} seconds={seconds} />
            <TimerControls
                customTime={customTime}
                setCustomTime={setCustomTime}
                isRunning={isRunning}
                onStart={onStart}
                onStop={onStop}
                onReset={onReset}
            />
        </div>
    );
};

export default TimerState;
