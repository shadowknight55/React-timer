import React, { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const ProgressPage = () => {
  const { settings } = useSettings();
  const [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    // Generate data for the chart based on the session durations
    const data = settings.sessions.map((session, index) => ({
      session: index + 1,
      duration: session.duration / 60, // Convert to minutes
    }));
    setSessionData(data);
  }, [settings.sessions]);

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
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
          Rewards
        </Typography>
        <List>
          {settings.rewards.map((reward, index) => (
            <ListItem key={index}>
              <ListItemText primary={reward} />
            </ListItem>
          ))}
        </List>
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
    </Box>
  );
};

export default ProgressPage;
