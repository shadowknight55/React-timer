import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';

/**
 * StreakCounter component to display the current streak and historical streaks.
 */
const StreakCounter = () => {
  const { settings } = useSettings();
  const [showHistory, setShowHistory] = useState(false);

  // Example historical streaks data (this should ideally come from persistent storage or backend)
  const historicalStreaks = settings.historicalStreaks || [
    { streak: 5, startDate: '2023-09-01', endDate: '2023-09-05' },
    { streak: 3, startDate: '2023-08-20', endDate: '2023-08-22' },
    { streak: 7, startDate: '2023-07-10', endDate: '2023-07-16' },
  ];

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Current Streak
      </Typography>
      <Typography variant="body1">
        You are currently on a {settings.streak}-session streak!
      </Typography>
      <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setShowHistory(true)}>
        View Streak History
      </Button>

      {/* Dialog to display historical streaks */}
      <Dialog open={showHistory} onClose={() => setShowHistory(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Streak History</DialogTitle>
        <DialogContent>
          <List>
            {historicalStreaks.map((streak, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Streak: ${streak.streak} sessions`}
                  secondary={`From: ${streak.startDate} To: ${streak.endDate}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default StreakCounter;
