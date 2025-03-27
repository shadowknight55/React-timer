import React, { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { 
  Box, Typography, Paper, Grid, Card, CardContent, 
  IconButton, Container, Divider, Tooltip, useTheme
} from '@mui/material';
import ChartRenderer from '../components/progress/ChartRenderer';
import StreakHistoryDialog from '../components/progress/StreakHistoryDialog';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HistoryIcon from '@mui/icons-material/History';

const ProgressPage = () => {
  const { settings } = useSettings();
  const [sessionData, setSessionData] = useState([]);
  const [showStreakHistory, setShowStreakHistory] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // Filter out any invalid sessions and sort by timestamp
    const validSessions = settings.sessions
      .filter(session => 
        session && 
        typeof session.duration === 'number' && 
        !isNaN(session.duration) &&
        session.timestamp
      )
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Create chart data
    const data = validSessions.map((session, index) => ({
      x: `Session ${index + 1}`,
      y: Math.round(session.duration / 60), // Convert seconds to minutes
    }));

    setSessionData(data);
  }, [settings.sessions]);

  const StatCard = ({ title, value, icon, subtitle }) => (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        }
      }}
    >
      <CardContent sx={{ p: 0.5, '&:last-child': { pb: 0.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            color="primary" 
            sx={{ 
              mr: 0.25, 
              p: 0.25,
              '& .MuiSvgIcon-root': {
                fontSize: '0.875rem'
              }
            }}
          >
            {icon}
          </IconButton>
          <Box>
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', lineHeight: 1 }}>
              {title}
            </Typography>
            <Typography variant="subtitle2" sx={{ lineHeight: 1.1 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem', display: 'block', lineHeight: 1 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  // Calculate stats from valid sessions only
  const validSessions = settings.sessions.filter(
    session => session && typeof session.duration === 'number' && !isNaN(session.duration)
  );
  
  const totalSessions = validSessions.length;
  const totalMinutes = Math.round(
    validSessions.reduce((acc, session) => acc + session.duration / 60, 0)
  );
  const averageSessionLength = totalSessions > 0 
    ? Math.round(totalMinutes / totalSessions) 
    : 0;

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        height: 'calc(100vh - 48px)', // Subtract navbar height
        py: 0.5,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography 
        variant="subtitle2" 
        align="center" 
        sx={{ 
          mb: 0.5,
          fontWeight: 'medium',
          color: theme.palette.primary.main,
          lineHeight: 1
        }}
      >
        Your Progress
      </Typography>

      <Grid container spacing={0.5} sx={{ mb: 0.5 }}>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Current Streak"
            value={settings.streak}
            icon={<WhatshotIcon />}
            subtitle="consecutive sessions"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Total Sessions"
            value={totalSessions}
            icon={<TimelineIcon />}
            subtitle="completed sessions"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Total Minutes"
            value={totalMinutes}
            icon={<HistoryIcon />}
            subtitle="minutes focused"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Avg. Session"
            value={`${averageSessionLength} min`}
            icon={<EmojiEventsIcon />}
            subtitle="per session"
          />
        </Grid>
      </Grid>

      <Paper 
        elevation={0} 
        variant="outlined"
        sx={{ 
          p: 0.5, 
          mb: 0.5,
          borderRadius: 1,
          backgroundColor: theme.palette.background.paper,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0 // Important for flex child to shrink
        }}
      >
        <Typography variant="caption" sx={{ mb: 0.25, fontWeight: 'medium', lineHeight: 1 }}>
          Session History
        </Typography>
        <Box sx={{ flexGrow: 1, minHeight: 0 }}>
          <ChartRenderer chartType={settings.chartType} sessionData={sessionData} />
        </Box>
      </Paper>

      <Paper 
        elevation={0}
        variant="outlined" 
        sx={{ 
          p: 0.5,
          borderRadius: 1,
          backgroundColor: theme.palette.background.paper,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          }
        }}
        onClick={() => setShowStreakHistory(true)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
            Streak History
          </Typography>
          <Tooltip title="View detailed streak history">
            <IconButton size="small" sx={{ p: 0.25 }}>
              <HistoryIcon sx={{ fontSize: '0.875rem' }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider sx={{ my: 0.25 }} />
        <Typography variant="caption" sx={{ fontSize: '0.7rem', display: 'block', lineHeight: 1 }}>
          Click to view your detailed streak history
        </Typography>
      </Paper>

      <StreakHistoryDialog
        open={showStreakHistory}
        onClose={() => setShowStreakHistory(false)}
        historicalStreaks={settings.historicalStreaks || []}
      />
    </Container>
  );
};

export default ProgressPage;
