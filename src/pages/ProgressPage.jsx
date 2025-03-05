import React, { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Box, Typography } from '@mui/material';
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Progress
      </Typography>
      <Typography variant="body1" gutterBottom>
        Track your progress here.
      </Typography>
      <Box sx={{ mt: 3 }}>
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
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Rewards
        </Typography>
        <ul>
          {settings.rewards.map((reward, index) => (
            <li key={index}>{reward}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default ProgressPage;
