import React, { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useNotification } from '../context/NotificationContext';
import { Box, Typography, Paper, List, ListItem, ListItemText, Button } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import RewardPopup from '../components/feedback/RewardPopup';

const ProgressPage = () => {
  const { settings } = useSettings();
  const { rewards, allRewards } = useNotification();
  const [sessionData, setSessionData] = useState([]);
  const [showEarnedRewardPopup, setShowEarnedRewardPopup] = useState(false);
  const [showUnearnedRewardPopup, setShowUnearnedRewardPopup] = useState(false);

  useEffect(() => {
    // Generate data for the chart based on the session durations
    const data = settings.sessions.map((session, index) => ({
      session: index + 1,
      duration: session.duration / 60, // Convert to minutes
    }));
    setSessionData(data);
  }, [settings.sessions]);

  const unearnedRewards = allRewards.filter(reward => !rewards.includes(reward));

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Progress
      </Typography>
      <Typography variant="body1" gutterBottom>
        Track your progress here.
      </Typography>
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Streak
        </Typography>
        <Typography variant="body1">
          You are currently on a {settings.streak}-session streak!
        </Typography>
      </Paper>
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Earned Rewards
        </Typography>
        <Button variant="outlined" onClick={() => setShowEarnedRewardPopup(true)}>
          Show Earned Rewards
        </Button>
      </Paper>
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Unearned Rewards
        </Typography>
        <Button variant="outlined" onClick={() => setShowUnearnedRewardPopup(true)}>
          Show Unearned Rewards
        </Button>
      </Paper>
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Timer Sessions
        </Typography>
        <LineChart
          xAxis={[{ data: sessionData.map((item) => item.session) }]}
          series={[
            {
              data: sessionData.map((item) => item.duration),
            },
          ]}
          width={500}
          height={300}
        />
      </Paper>
      {showEarnedRewardPopup && <RewardPopup rewards={rewards} onClose={() => setShowEarnedRewardPopup(false)} />}
      {showUnearnedRewardPopup && <RewardPopup rewards={unearnedRewards} onClose={() => setShowUnearnedRewardPopup(false)} />}
    </Box>
  );
};

export default ProgressPage;
