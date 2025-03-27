import React from 'react';
import { Box, Button, Slider } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import './TimerControls.css';

/**
 * TimerControls component to manage timer functionality.
 * @param isRunning - Boolean indicating if the timer is running.
 * @param onStart - Function to start the timer.
 * @param onStop - Function to stop the timer.
 * @param onReset - Function to reset the timer.
 * @param volume - Current volume of the ticking sound.
 * @param onVolumeChange - Function to change the volume of the ticking sound.
 * @param isMuted - Boolean indicating if the ticking sound is muted.
 * @param onMuteToggle - Function to toggle the mute state of the ticking sound.
 */
const TimerControls = ({
  isRunning,
  onStart,
  onStop,
  onReset,
  volume,
  onVolumeChange,
  isMuted,
  onMuteToggle
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', mt: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={isRunning ? onStop : onStart}
        >
          {isRunning ? 'Stop' : 'Start'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onReset}
          disabled={isRunning}
        >
          Reset
        </Button>
      </Box>

      {/* Volume Control */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '250px' }}>
        <Button
          onClick={onMuteToggle}
          sx={{ minWidth: '40px' }}
        >
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </Button>
        <Slider
          value={isMuted ? 0 : volume}
          onChange={onVolumeChange}
          min={0}
          max={1}
          step={0.1}
          disabled={isMuted}
          sx={{ flexGrow: 1 }}
        />
      </Box>
    </Box>
  );
};

export default TimerControls;