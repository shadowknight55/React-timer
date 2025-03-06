import { useState, useEffect, useCallback } from 'react';
import { useNotification } from '../context/NotificationContext';

const useTimer = (initialTime) => {
  const { addReward, incrementStreak, incrementStartStopCount } = useNotification();
  const [customTime, setCustomTime] = useState(initialTime);
  const [time, setTime] = useState(initialTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(() => {
    const savedHasStarted = localStorage.getItem('hasStarted');
    return savedHasStarted ? JSON.parse(savedHasStarted) : false;
  });

  useEffect(() => {
    localStorage.setItem('hasStarted', JSON.stringify(hasStarted));
  }, [hasStarted]);

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

  const onStart = useCallback(() => {
    setIsRunning(true);
    if (!hasStarted) {
      setHasStarted(true);
      addReward('Started the timer for the first time!');
    }
    incrementStartStopCount();
  }, [hasStarted, addReward, incrementStartStopCount]);

  const onStop = useCallback(() => {
    setIsRunning(false);
    incrementStartStopCount();
  }, [incrementStartStopCount]);

  const onReset = useCallback(() => {
    setIsRunning(false);
    setTime(customTime * 60);
  }, [customTime]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return {
    customTime,
    setCustomTime,
    isRunning,
    onStart,
    onStop,
    onReset,
    hours,
    minutes,
    seconds,
    time,
  };
};

export default useTimer;
