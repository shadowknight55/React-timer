import { useContext, useState, useEffect } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { 
  Container, 
  Typography, 
  Box, 
  Switch, 
  FormControlLabel, 
  Paper,
  TextField,
  Button,
  Stack,
  ButtonGroup,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TimerIcon from '@mui/icons-material/Timer';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * SettingsPanel component to manage application settings.
 */
export default function SettingsPanel() {
  const { settings, updateSetting } = useContext(SettingsContext);
  const [localPresets, setLocalPresets] = useState({
    hours: Math.floor(settings.timerPresets?.focusTime / 60) || 0,
    minutes: settings.timerPresets?.focusTime % 60 || 25,
  });

  // Effect to initialize timer presets if not already set
  useEffect(() => {
    if (!settings.timerPresets) {
      updateSetting('timerPresets', {
        focusTime: 25,
      });
    }
  }, [settings.timerPresets, updateSetting]);

  // Handle changes to the timer preset input
  function handlePresetChange(event) {
    const { name, value } = event.target;
    const newValue = parseInt(value) || 0;

    // Ensure the value is within a valid range
    if (name === 'hours' && newValue >= 0 && newValue <= 23) {
      setLocalPresets((prev) => ({
        ...prev,
        [name]: newValue
      }));
    } else if (name === 'minutes' && newValue >= 0 && newValue <= 59) {
      setLocalPresets((prev) => ({
        ...prev,
        [name]: newValue
      }));
    }
  }

  // Save the updated timer presets
  function savePresets() {
    const totalMinutes = localPresets.hours * 60 + localPresets.minutes;
    updateSetting("timerPresets", { focusTime: totalMinutes });
    updateSetting("timerDuration", totalMinutes); // Update timerDuration as well
  }

  const handleChartTypeChange = (type) => {
    updateSetting('chartType', type);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', mb: 2 }}>
        Settings
      </Typography>

      <Stack spacing={1}>
        {/* Notifications and Sound */}
        <Paper elevation={0} variant="outlined" sx={{ p: 1.5 }}>
          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications}
                  onChange={() => updateSetting("notifications", !settings.notifications)}
                  color="primary"
                  size="small"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <NotificationsIcon fontSize="small" />
                  <Typography variant="body2">Enable Notifications</Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.sound}
                  onChange={() => updateSetting("sound", !settings.sound)}
                  color="primary"
                  size="small"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <VolumeUpIcon fontSize="small" />
                  <Typography variant="body2">Enable Sounds</Typography>
                </Box>
              }
            />
          </Stack>
        </Paper>

        {/* Timer Presets */}
        <Paper elevation={0} variant="outlined" sx={{ p: 1.5 }}>
          <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <TimerIcon fontSize="small" />
            Timer Duration
          </Typography>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
              <TextField
                label="Hours"
                type="number"
                name="hours"
                value={localPresets.hours}
                onChange={handlePresetChange}
                inputProps={{ min: 0, max: 23 }}
                size="small"
              />
              <TextField
                label="Minutes"
                type="number"
                name="minutes"
                value={localPresets.minutes}
                onChange={handlePresetChange}
                inputProps={{ min: 0, max: 59 }}
                size="small"
              />
            </Stack>
            <Button 
              variant="contained" 
              onClick={savePresets}
              size="small"
            >
              Save Timer Duration
            </Button>
          </Stack>
        </Paper>

        {/* Chart Type */}
        <Paper elevation={0} variant="outlined" sx={{ p: 1.5 }}>
          <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <ShowChartIcon fontSize="small" />
            Chart Type
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Chart Type</InputLabel>
            <Select
              value={settings.chartType}
              label="Chart Type"
              onChange={(e) => updateSetting('chartType', e.target.value)}
            >
              <MenuItem value="line">Line Chart</MenuItem>
              <MenuItem value="bar">Bar Chart</MenuItem>
              <MenuItem value="pie">Pie Chart</MenuItem>
            </Select>
          </FormControl>
        </Paper>

        {/* Time Period */}
        <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimerIcon />
            Time Period
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Time Period</InputLabel>
            <Select
              value={settings.chartTimePeriod}
              label="Time Period"
              onChange={(e) => updateSetting('chartTimePeriod', e.target.value)}
            >
              <MenuItem value="days">Daily</MenuItem>
              <MenuItem value="months">Monthly</MenuItem>
              <MenuItem value="years">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Paper>

        {/* Clear Data */}
        <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DeleteIcon />
            Clear Data
          </Typography>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Clear All Data
          </Button>
        </Paper>
      </Stack>
    </Container>
  );
}
