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

  return (
    <div className={`settings-panel ${settings.theme}`}>
      <h2>Settings</h2>

      {/* Theme Selector */}
      <label>
        Theme:
        <select value={settings.theme} onChange={(e) => updateSetting("theme", e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="blue">Blue</option>
        </select>
      </label>

      {/* Notification Toggle */}
      <label>
        Notifications:
        <input
          type="checkbox"
          checked={settings.notifications}
          onChange={() => updateSetting("notifications", !settings.notifications)}
        />
      </label>

      {/* Sound Toggle */}
      <label>
        App Sounds:
        <input
          type="checkbox"
          checked={settings.sound}
          onChange={() => updateSetting("sound", !settings.sound)}
        />
      </label>

      {/* Timer Presets */}
      <h3>Timer Presets</h3>
      <label>
        Hours:
        <input type="number" name="hours" value={localPresets.hours} onChange={handlePresetChange} />
      </label>
      <label>
        Minutes:
        <input type="number" name="minutes" value={localPresets.minutes} onChange={handlePresetChange} />
      </label>
      <button onClick={savePresets}>Save Timer Presets</button>
    </div>
  );
}
