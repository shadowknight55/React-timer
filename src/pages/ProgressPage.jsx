import React, { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useNotification } from '../context/NotificationContext';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import ChartRenderer from '../components/progress/ChartRenderer';
import StreakHistoryDialog from '../components/progress/StreakHistoryDialog';
import RewardPopup from '../components/feedback/RewardPopup';

const ProgressPage = () => {
  const { settings, updateSetting } = useSettings();
  const { rewards, allRewards } = useNotification();
  const [sessionData, setSessionData] = useState([]);
  const [showEarnedRewardPopup, setShowEarnedRewardPopup] = useState(false);
  const [showUnearnedRewardPopup, setShowUnearnedRewardPopup] = useState(false);
  const [showStreakHistory, setShowStreakHistory] = useState(false);

  useEffect(() => {
    // Generate data for the chart based on the session durations
    const data = settings.sessions
      .map((session, index) => ({
        x: `Session ${index + 1}`,
        y: session.duration / 60, // Convert to minutes
      }))
      .filter((item) => typeof item.y === 'number' && !isNaN(item.y)); // Filter out invalid data
    setSessionData(data);

    // Move the current streak to history if the page is reset
    if (settings.streak > 0) {
      const newStreak = {
        streak: settings.streak,
        startDate: settings.streakStartDate || new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
      };
      const updatedStreaks = [...(settings.historicalStreaks || []), newStreak]; // Ensure historicalStreaks is an array
      updateSetting('historicalStreaks', updatedStreaks);
      updateSetting('streak', 0); // Reset current streak
      updateSetting('streakStartDate', null); // Reset streak start date
    }
  }, [settings.sessions, settings.streak, settings.streakStartDate, updateSetting]);

  const unearnedRewards = allRewards.filter(reward => !rewards.includes(reward));

  return (
    <Box
      sx={{
        p: 2,
        maxWidth: 900,
        margin: '0 auto',
        height: '100vh', // Set the height to the full viewport
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Distribute content evenly
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Progress
      </Typography>
      <Typography variant="body1" gutterBottom textAlign="center">
        Track your progress here.
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ flexGrow: 1 }}>
        {/* Current Streak Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 1.5, textAlign: 'center', minHeight: 100 }}>
            <Typography variant="h6" gutterBottom>
              Current Streak
            </Typography>
            <Typography variant="body2">
              You are currently on a {settings.streak}-session streak!
            </Typography>
          </Paper>
        </Grid>

        {/* Earned Rewards Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 1.5, textAlign: 'center', minHeight: 100 }}>
            <Typography variant="h6" gutterBottom>
              Earned Rewards
            </Typography>
            <Button variant="outlined" onClick={() => setShowEarnedRewardPopup(true)}>
              Show Earned Rewards
            </Button>
          </Paper>
        </Grid>

        {/* Unearned Rewards Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 1.5, textAlign: 'center', minHeight: 100 }}>
            <Typography variant="h6" gutterBottom>
              Unearned Rewards
            </Typography>
            <Button variant="outlined" onClick={() => setShowUnearnedRewardPopup(true)}>
              Show Unearned Rewards
            </Button>
          </Paper>
        </Grid>

        {/* Timer Sessions Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, minHeight: 150 }}>
            <Typography variant="h6" gutterBottom>
              Timer Sessions
            </Typography>
            <ChartRenderer chartType={settings.chartType} sessionData={sessionData} />
          </Paper>
        </Grid>

        {/* Streak History Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 1.5, textAlign: 'center', minHeight: 100 }}>
            <Typography variant="h6" gutterBottom>
              Streak History
            </Typography>
            <Button variant="outlined" onClick={() => setShowStreakHistory(true)}>
              View Streak History
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Streak History Dialog */}
      <StreakHistoryDialog
        open={showStreakHistory}
        onClose={() => setShowStreakHistory(false)}
        historicalStreaks={settings.historicalStreaks || []} // Ensure historicalStreaks is always an array
      />

      {/* Reward Popups */}
      {showEarnedRewardPopup && <RewardPopup rewards={rewards} onClose={() => setShowEarnedRewardPopup(false)} />}
      {showUnearnedRewardPopup && <RewardPopup rewards={unearnedRewards} onClose={() => setShowUnearnedRewardPopup(false)} />}
    </Box>
  );
};

export default ProgressPage;
