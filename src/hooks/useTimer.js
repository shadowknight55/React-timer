import { useState, useEffect, useCallback } from 'react';
import { useNotification } from '../context/NotificationContext';
import { useLocation } from 'react-router-dom'; // Import useLocation (AI)

const useTimer = (initialTime) => {
  const { addReward, incrementStreak, incrementStartStopCount } = useNotification();
  const [customTime, setCustomTime] = useState(initialTime);
  const [time, setTime] = useState(initialTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(() => {
    const savedHasStarted = localStorage.getItem('hasStarted');
    return savedHasStarted ? JSON.parse(savedHasStarted) : false;
  });
  const location = useLocation(); // Get the location(AI)

  useEffect(() => {
    localStorage.setItem('hasStarted', JSON.stringify(hasStarted));
  }, [hasStarted]);

  const memoizedIncrementStreak = useCallback(incrementStreak, []);//(AI)

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false); 
      memoizedIncrementStreak();//(AI)
    }
    return () => clearInterval(timer);
  }, [isRunning, time, memoizedIncrementStreak]); // (Ai)Ensure the dependency array only includes 'isRunning', 'time', and 'memoizedIncrementStreak'

  const onStart = useCallback(() => {
    setIsRunning(true);
    if (!hasStarted) {
      setHasStarted(true);
      addReward('First Timer: Started the timer for the first time!');
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
