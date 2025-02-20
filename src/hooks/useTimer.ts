import { useState, useEffect } from 'react';

const useTimer = (initialTime: number) => {
    const [customTime, setCustomTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(initialTime);

    useEffect(() => {
        let timer;
        if (isRunning && (minutes > 0 || seconds > 0)) {
            timer = setInterval(() => {
                if (seconds === 0) {
                    setMinutes(prev => prev - 1);
                    setSeconds(60);
                } else {
                    setSeconds(prev => prev - 1);
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, seconds, minutes]);

    const onStart = () => {
        setIsRunning(true);
        setMinutes(customTime);
        setSeconds(60);
    };

    const onStop = () => setIsRunning(false);

    const onReset = () => {
        setIsRunning(false);
        setCustomTime(initialTime);
        setMinutes(initialTime);
        setSeconds(0);
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
