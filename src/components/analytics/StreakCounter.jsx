import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Box, Typography, Button } from '@mui/material';

/**
 * StreakCounter component to display the current streak and historical streaks.
 */
const StreakCounter = () => {
  const { settings } = useSettings();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Current Streak
      </Typography>
      <Typography variant="body1">
        {settings.streak > 0 
          ? `You are currently on a ${settings.streak}-session streak!`
          : 'Start your first session to begin your streak!'}
      </Typography>
      {settings.historicalStreaks?.length > 0 && (
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setShowHistory(true)}>
          View Streak History
        </Button>
      )}
    </Box>
  );
};

export default StreakCounter;
