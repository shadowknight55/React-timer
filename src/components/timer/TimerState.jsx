import React from 'react';
import useTimer from '../../hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';

/**
 * TimerState component to manage and display the timer state.
 * @param initialTime - The initial time in minutes.
 */
const TimerState = ({ initialTime }) => {
    const {
        customTime, // Custom time set by the user
        setCustomTime, // Function to set the custom time
        isRunning, // Boolean indicating if the timer is running
        onStart, // Function to start the timer
        onStop, // Function to stop the timer
        onReset, // Function to reset the timer
        minutes, // Current minutes of the timer
        seconds // Current seconds of the timer
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
