import React, { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Box, Typography, Paper, Grid } from '@mui/material';
import ChartRenderer from '../components/progress/ChartRenderer';
import StreakHistoryDialog from '../components/progress/StreakHistoryDialog';

const ProgressPage = () => {
  const { settings } = useSettings();
  const [sessionData, setSessionData] = useState([]);
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
  }, [settings.sessions]);

  return (
    <Box
      sx={{
        p: 2,
        maxWidth: 900,
        margin: '0 auto',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Progress
      </Typography>
      <Typography variant="body1" gutterBottom textAlign="center">
        Track your progress here.
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ flexGrow: 1 }}>
        {/* Streak History Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 1.5, textAlign: 'center', minHeight: 100 }}>
            <Typography variant="h6" gutterBottom>
              Streak History
            </Typography>
            <button onClick={() => setShowStreakHistory(true)}>View Streak History</button>
          </Paper>
        </Grid>

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

        {/* Timer Sessions Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, minHeight: 150 }}>
            <Typography variant="h6" gutterBottom>
              Timer Sessions
            </Typography>
            <ChartRenderer chartType={settings.chartType} sessionData={sessionData} />
          </Paper>
        </Grid>
      </Grid>

      {/* Streak History Dialog */}
      <StreakHistoryDialog
        open={showStreakHistory}
        onClose={() => setShowStreakHistory(false)}
        historicalStreaks={settings.historicalStreaks || []}
      />
    </Box>
  );
};

export default ProgressPage;
