import React, { useEffect, useCallback } from 'react';
import { useTimer } from '../../hooks/useTimer';
import { useSettings } from '../../context/SettingsContext';
import { useNotification } from '../../context/NotificationContext';
import { Box, Typography, IconButton, Paper, Stack, Divider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const TimeUnit = ({ value, label }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography variant="h3" sx={{ fontFamily: 'monospace', fontWeight: 'light', lineHeight: 1 }}>
      {value}
    </Typography>
    <Typography variant="caption" sx={{ opacity: 0.7, mt: 0.5 }}>
      {label}
    </Typography>
  </Box>
);

/**
 * TimerState component to manage and display the timer state.
 * @param initialTime - The initial time in minutes.
 */
const TimerState = () => {
  const { settings, updateSetting } = useSettings();
  const { addNotification } = useNotification();
  
  // Calculate total seconds from timer presets
  const totalSeconds = settings.timerPresets?.focusTime 
    ? settings.timerPresets.focusTime * 60 // Convert minutes to seconds
    : settings.timerDuration * 60; // Fallback to timerDuration if presets not available
  
  const onComplete = useCallback(() => {
    const currentTime = new Date().toISOString();
    
    // Add the completed session with actual duration and timestamp
    const newSession = {
      duration: totalSeconds, // Use the actual duration in seconds
      timestamp: currentTime
    };
    
    // Update settings in the next tick to prevent render issues
    Promise.resolve().then(() => {
      // Update sessions and streak
      updateSetting('sessions', [...settings.sessions, newSession]);
      updateSetting('streak', settings.streak + 1);
      updateSetting('lastSessionDate', currentTime);
    });

    // Show completion notification
    addNotification('Session completed! 🎉');
    
    // Auto-reset after 1 second to allow notification to show
    setTimeout(() => {
      onReset();
    }, 1000);
  }, [settings.sessions, settings.streak, totalSeconds, updateSetting, addNotification]);

  const {
    seconds,
    isActive,
    isPaused,
    start,
    pause,
    resume,
    reset: onReset,
    hours,
    minutes,
    remainingSeconds
  } = useTimer({
    initialSeconds: totalSeconds,
    onComplete
  });

  // Update timer duration when settings change
  useEffect(() => {
    if (!isActive && !isPaused) {
      onReset();
    }
  }, [settings.timerPresets, settings.timerDuration, isActive, isPaused, onReset]);

  // Format time for display
  const timeDisplay = {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: remainingSeconds.toString().padStart(2, '0')
  };

  return (
    <Paper 
      elevation={0}
      variant="outlined"
      sx={{ 
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        borderRadius: 2,
        backgroundColor: "#ffffff",
        color: '#333'
      }}
    >
      <Stack 
        direction="row" 
        spacing={2} 
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem sx={{ mx: 1 }} />}
      >
        <TimeUnit value={timeDisplay.hours} label="hours" />
        <TimeUnit value={timeDisplay.minutes} label="minutes" />
        <TimeUnit value={timeDisplay.seconds} label="seconds" />
      </Stack>
      
      <Stack direction="row" spacing={1}>
        {!isActive && !isPaused ? (
          <IconButton 
            onClick={start}
            color="primary"
            size="large"
          >
            <PlayArrowIcon />
          </IconButton>
        ) : isPaused ? (
          <IconButton 
            onClick={resume}
            color="primary"
            size="large"
          >
            <PlayArrowIcon />
          </IconButton>
        ) : (
          <IconButton 
            onClick={pause}
            color="primary"
            size="large"
          >
            <PauseIcon />
          </IconButton>
        )}
        
        <IconButton 
          onClick={onReset}
          color="primary"
          size="large"
        >
          <RestartAltIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default TimerState;
