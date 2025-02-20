import React from "react";
import TimerState from "./timer/TimerState";

const Card = ({ initialTime }) => {
    return (
        // Main render of the Card component
        <div className="card">
            <TimerState initialTime={initialTime} />
        </div>
    );
};

export default Card;