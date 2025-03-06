import { useState, useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';

const useTimer = (initialTime) => {
  const { addReward, incrementStreak } = useNotification();
  const [customTime, setCustomTime] = useState(initialTime);
  const [time, setTime] = useState(initialTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      incrementStreak();
    }
    return () => clearInterval(timer);
  }, [isRunning, time, incrementStreak]);

  const onStart = () => {
    setIsRunning(true);
    if (!hasStarted) {
      setHasStarted(true);
      addReward('Started the timer for the first time!');
    }
  };

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
