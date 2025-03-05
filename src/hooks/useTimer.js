import { useState, useEffect } from 'react';

const useTimer = (initialTime) => {
  const [customTime, setCustomTime] = useState(initialTime);
  const [time, setTime] = useState(initialTime * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const onStart = () => setIsRunning(true);
  const onStop = () => setIsRunning(false);
  const onReset = () => {
    setIsRunning(false);
    setTime(customTime * 60);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return {
    customTime,
    setCustomTime,
    isRunning,
    onStart,
    onStop,
    onReset,
    minutes,
    seconds,
    time,
  };
};

export default useTimer;
