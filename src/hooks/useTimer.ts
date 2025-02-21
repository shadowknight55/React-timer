import { useState, useEffect } from 'react';

/**
 * Custom hook to manage timer state and logic.
 * @param initialTime - The initial time in minutes.
 * @returns An object containing timer state and control functions.
 */
const useTimer = (initialTime: number) => {
    const [customTime, setCustomTime] = useState(initialTime); // State to manage custom time
    const [isRunning, setIsRunning] = useState(false); // State to manage if the timer is running
    const [seconds, setSeconds] = useState(0); // State to manage seconds
    const [minutes, setMinutes] = useState(initialTime); // State to manage minutes

    useEffect(() => {
        let timer;
        if (isRunning && (minutes > 0 || seconds > 0)) {
            timer = setInterval(() => {
                if (seconds === 0) {
                    setMinutes(prev => prev - 1); // Decrease minutes
                    setSeconds(60); // Reset seconds to 60
                } else {
                    setSeconds(prev => prev - 1); // Decrease seconds
                }
            }, 1000);
        }
        return () => clearInterval(timer); // Cleanup the timer on component unmount
    }, [isRunning, seconds, minutes]);

    const onStart = () => {
        setIsRunning(true); 
        setMinutes(customTime); // Set minutes based on custom time when starting
        setSeconds(60); // Set seconds to 60 when starting
    };

    const onStop = () => setIsRunning(false); // Stop the timer

    const onReset = () => {
        setIsRunning(false); 
        setCustomTime(initialTime); // Reset custom time to initial time
        setMinutes(initialTime); // Reset minutes to initial time
        setSeconds(0); // Reset seconds to 0
    };

    return {
        customTime,
        setCustomTime,
        isRunning,
        onStart,
        onStop,
        onReset,
        minutes,
        seconds
    };
};

export default useTimer;
