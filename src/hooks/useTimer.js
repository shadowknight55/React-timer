import { useState, useEffect, useCallback, useRef } from 'react';
import { useNotification } from '../context/NotificationContext';
import { useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import tickingSound from '../audio/wall-clock-ticking-308746.mp3';

const useTimer = (initialTime) => {
  const { addReward, incrementStreak, incrementStartStopCount } = useNotification();
  const { settings } = useSettings();
  const [time, setTime] = useState(initialTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('timerVolume');
    return savedVolume ? parseFloat(savedVolume) : 0.5;
  });
  const [isMuted, setIsMuted] = useState(() => {
    const savedMuted = localStorage.getItem('timerMuted');
    return savedMuted ? JSON.parse(savedMuted) : false;
  });
  const [hasStarted, setHasStarted] = useState(() => {
    const savedHasStarted = localStorage.getItem('hasStarted');
    return savedHasStarted ? JSON.parse(savedHasStarted) : false;
  });
  const location = useLocation();
  const audioRef = useRef(new Audio(tickingSound));

  // Configure audio
  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = settings.sound ? (isMuted ? 0 : volume) : 0;
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, [volume, isMuted, settings.sound]);

  // Save volume settings
  useEffect(() => {
    localStorage.setItem('timerVolume', volume.toString());
    localStorage.setItem('timerMuted', JSON.stringify(isMuted));
  }, [volume, isMuted]);

  // Handle audio playback
  useEffect(() => {
    if (isRunning && time > 0 && settings.sound) {
      audioRef.current.play().catch(error => {
        console.log('Audio playback failed:', error);
      });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isRunning, time, settings.sound]);

  useEffect(() => {
    localStorage.setItem('hasStarted', JSON.stringify(hasStarted));
  }, [hasStarted]);

  const memoizedIncrementStreak = useCallback(incrementStreak, []);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      memoizedIncrementStreak();
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    return () => clearInterval(timer);
  }, [isRunning, time, memoizedIncrementStreak]);

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
    setTime(initialTime * 60);
  }, [initialTime]);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (settings.sound) {
      audioRef.current.volume = isMuted ? 0 : newValue;
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (settings.sound) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return {
    isRunning,
    onStart,
    onStop,
    onReset,
    hours,
    minutes,
    seconds,
    time,
    volume,
    handleVolumeChange,
    isMuted,
    handleMuteToggle
  };
};

export default useTimer;
