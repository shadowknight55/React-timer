import React from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";

const Card = ({ customTime, setCustomTime, isRunning, setIsRunning, minutes, setMinutes, seconds, setSeconds }) => {
    return (
        // Main render of the Card component
        <div className="card">
            <TimerDisplay 
                minutes={minutes}
                seconds={seconds}
            />
            <TimerControls 
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

export default Card;