import { useState, useEffect, useCallback, useRef } from 'react';
import { useNotification } from '../context/NotificationContext';
import { useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import tickingSound from '../audio/wall-clock-ticking-308746.mp3';

export const useTimer = ({ initialSeconds, onComplete }) => {
  const { addReward, incrementStreak, incrementStartStopCount } = useNotification();
  const { settings } = useSettings();
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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
  
  // Store initial seconds in a ref to persist across renders
  const initialSecondsRef = useRef(initialSeconds);
  
  useEffect(() => {
    // Update initial seconds ref when prop changes
    initialSecondsRef.current = initialSeconds;
    // Reset timer state when initial seconds changes
    if (!isActive && !isPaused) {
      setSeconds(initialSeconds);
    }
  }, [initialSeconds, isActive, isPaused]);

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
    const audio = audioRef.current;
    
    if (isActive && !isPaused && seconds > 0 && settings.sound && !isMuted) {
      // Try to play the audio
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio is playing
          })
          .catch(error => {
            console.log('Audio playback failed:', error);
          });
      }
    } else {
      // Stop the audio when paused or timer is not active
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    }

    // Cleanup function to ensure audio is stopped when component unmounts
    return () => {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [isActive, isPaused, seconds, settings.sound, isMuted]);

  useEffect(() => {
    localStorage.setItem('hasStarted', JSON.stringify(hasStarted));
  }, [hasStarted]);

  const memoizedIncrementStreak = useCallback(incrementStreak, [incrementStreak]);
  const memoizedIncrementStartStop = useCallback(incrementStartStopCount, [incrementStartStopCount]);

  useEffect(() => {
    let interval = null;
    
    if (isActive && !isPaused && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => {
          const newSeconds = seconds - 1;
          if (newSeconds === 0) {
            if (onComplete) {
              onComplete();
            }
            memoizedIncrementStreak();
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          return newSeconds;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, isPaused, seconds, onComplete, memoizedIncrementStreak]);

  const start = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
    if (!hasStarted) {
      setHasStarted(true);
      addReward('First Timer: Started the timer for the first time!');
    }
    memoizedIncrementStartStop();
  }, [hasStarted, addReward, memoizedIncrementStartStop]);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const reset = useCallback(() => {
    setSeconds(initialSecondsRef.current);
    setIsActive(false);
    setIsPaused(false);
  }, []);

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

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return {
    seconds,
    isActive,
    isPaused,
    start,
    pause,
    resume,
    reset,
    initialSeconds: initialSecondsRef.current,
    hours,
    minutes,
    remainingSeconds,
    volume,
    handleVolumeChange,
    isMuted,
    handleMuteToggle
  };
};

export default useTimer;
