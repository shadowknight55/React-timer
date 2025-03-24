import { useContext, useState, useEffect } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import "./SettingsPanel.css";

/**
 * SettingsPanel component to manage application settings.
 */
export default function SettingsPanel() {
  const { settings, updateSetting } = useContext(SettingsContext);
  const [localPresets, setLocalPresets] = useState({
    hours: Math.floor(settings.timerPresets.focusTime / 60),
    minutes: settings.timerPresets.focusTime % 60,
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
    const newValue = parseInt(value, 10);

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
  }

  const handleChartTypeChange = (type) => {
    updateSetting('chartType', type);
  };

  return (
    <div className="settings-page">
      <h2 className="settings-title">Settings</h2>


      {/* Notification Toggle */}
      <div className="settings-section">
        <h3>Notifications</h3>
        <label className="settings-toggle">
          <span>Enable Notifications</span>
          <div
            className={`toggle-switch ${settings.notifications ? 'active' : ''}`}
            onClick={() => updateSetting("notifications", !settings.notifications)}
          >
            <div className="toggle-knob"></div>
          </div>
        </label>
      </div>

      {/* Sound Toggle */}
      <div className="settings-section">
        <h3>App Sounds</h3>
        <label className="settings-toggle">
          <span>Enable Sounds</span>
          <div
            className={`toggle-switch ${settings.sound ? 'active' : ''}`}
            onClick={() => updateSetting("sound", !settings.sound)}
          >
            <div className="toggle-knob"></div>
          </div>
        </label>
      </div>

      {/* Timer Presets */}
      <div className="settings-section">
        <h3>Timer Presets</h3>
        <div className="settings-timer-inputs">
          <label>
            Hours:
            <input
              type="number"
              name="hours"
              value={localPresets.hours}
              onChange={handlePresetChange}
              className="settings-input"
            />
          </label>
          <label>
            Minutes:
            <input
              type="number"
              name="minutes"
              value={localPresets.minutes}
              onChange={handlePresetChange}
              className="settings-input"
            />
          </label>
        </div>
        <button className="settings-button" onClick={savePresets}>
          Save Timer Presets
        </button>
      </div>

      {/* Chart Type Selector */}
      <div className="settings-section">
        <h3>Chart Type</h3>
        <div className="settings-chart-buttons">
          <button
            className={`settings-button ${settings.chartType === 'line' ? 'active' : ''}`}
            onClick={() => handleChartTypeChange('line')}
          >
            Line
          </button>
          <button
            className={`settings-button ${settings.chartType === 'bar' ? 'active' : ''}`}
            onClick={() => handleChartTypeChange('bar')}
          >
            Bar
          </button>
          <button
            className={`settings-button ${settings.chartType === 'pie' ? 'active' : ''}`}
            onClick={() => handleChartTypeChange('pie')}
          >
            Pie
          </button>
        </div>
      </div>

      {/* Clear Local Storage */}
      <div className="settings-section">
        <h3>Clear Data Storage</h3>
        <button
          className="settings-button danger"
          onClick={() => {
            localStorage.clear();
            window.location.reload(); // Reload the app to reset settings
          }}
        >
          Clear Data
        </button>
      </div>
    </div>
  );
}
