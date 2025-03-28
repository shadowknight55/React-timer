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
  Divider
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
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
        Settings
      </Typography>

      <Stack spacing={2}>
        {/* Notifications and Sound */}
        <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications}
                  onChange={() => updateSetting("notifications", !settings.notifications)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NotificationsIcon />
                  <Typography>Enable Notifications</Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.sound}
                  onChange={() => updateSetting("sound", !settings.sound)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <VolumeUpIcon />
                  <Typography>Enable Sounds</Typography>
                </Box>
              }
            />
          </Stack>
        </Paper>

        {/* Timer Presets */}
        <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimerIcon />
            Timer Duration
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
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
        <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShowChartIcon />
            Chart Type
          </Typography>
          <ButtonGroup variant="outlined" size="small">
            <Button 
              onClick={() => handleChartTypeChange('line')}
              variant={settings.chartType === 'line' ? 'contained' : 'outlined'}
            >
              Line
            </Button>
            <Button 
              onClick={() => handleChartTypeChange('bar')}
              variant={settings.chartType === 'bar' ? 'contained' : 'outlined'}
            >
              Bar
            </Button>
            <Button 
              onClick={() => handleChartTypeChange('pie')}
              variant={settings.chartType === 'pie' ? 'contained' : 'outlined'}
            >
              Pie
            </Button>
          </ButtonGroup>
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
