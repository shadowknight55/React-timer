import React, { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useNotification } from '../context/NotificationContext';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import LineChartComponent, { sampleLineChartData } from '../components/charts/LineChartComponent';
import BarChartComponent from '../components/charts/BarChartComponent';
import PieChartComponent from '../components/charts/PieChartComponent'; // Ensure PieChartComponent is imported
import RewardPopup from '../components/feedback/RewardPopup';

const ProgressPage = () => {
  const { settings } = useSettings();
  const { rewards, allRewards } = useNotification();
  const [sessionData, setSessionData] = useState([]);
  const [showEarnedRewardPopup, setShowEarnedRewardPopup] = useState(false);
  const [showUnearnedRewardPopup, setShowUnearnedRewardPopup] = useState(false);

  useEffect(() => {
    // Generate data for the chart based on the session durations
    const data = settings.sessions
      .map((session, index) => ({
        x: `Session ${index + 1}`,
        y: session.duration / 60, // Convert to minutes
      }))
      .filter((item) => typeof item.y === 'number' && !isNaN(item.y)); // Filter out invalid data
    setSessionData(data);
  }, [settings.sessions]);

  const unearnedRewards = allRewards.filter(reward => !rewards.includes(reward));

  const renderChart = () => {
    switch (settings.chartType) {
      case 'bar':
        return (
          <BarChartComponent
            series={[
              { data: sessionData, label: 'Session Durations (Minutes)' },
              { data: sampleLineChartData.daily, label: 'Sample Daily Data' },
            ]}
            title="Bar Chart"
          />
        );
      case 'pie':
        return (
          <PieChartComponent
            series={[
              { data: sessionData, label: 'Session Durations (Minutes)' },
              { data: sampleLineChartData.daily, label: 'Sample Daily Data' },
            ]}
            title="Pie Chart"
          />
        );
      case 'line':
      default:
        return (
          <LineChartComponent
            series={[
              { data: sessionData, label: 'Session Durations (Minutes)' },
              { data: sampleLineChartData.daily, label: 'Sample Daily Data' },
            ]}
            title="Line Chart"
          />
        );
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Progress
      </Typography>
      <Typography variant="body1" gutterBottom textAlign="center">
        Track your progress here.
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Current Streak
            </Typography>
            <Typography variant="body1">
              You are currently on a {settings.streak}-session streak!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Earned Rewards
            </Typography>
            <Button variant="outlined" onClick={() => setShowEarnedRewardPopup(true)}>
              Show Earned Rewards
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Unearned Rewards
            </Typography>
            <Button variant="outlined" onClick={() => setShowUnearnedRewardPopup(true)}>
              Show Unearned Rewards
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Timer Sessions
            </Typography>
            {renderChart()}
          </Paper>
        </Grid>
      </Grid>
      {showEarnedRewardPopup && <RewardPopup rewards={rewards} onClose={() => setShowEarnedRewardPopup(false)} />}
      {showUnearnedRewardPopup && <RewardPopup rewards={unearnedRewards} onClose={() => setShowUnearnedRewardPopup(false)} />}
    </Box>
  );
};

export default ProgressPage;
