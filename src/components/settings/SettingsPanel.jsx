import { useContext, useState, useEffect } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import "./SettingsPanel.css";

export default function SettingsPanel() {
  const { settings, updateSetting } = useContext(SettingsContext);
  const [localPresets, setLocalPresets] = useState(settings.timerPresets || {
    focusTime: 25,
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

    // Ensure the value is within a valid range (1-1440 minutes)
    if (newValue >= 1 && newValue <= 1440) {
      setLocalPresets((prev) => ({
        ...prev,
        [name]: newValue
      }));
    }
  }

  // Save the updated timer presets
  function savePresets() {
    updateSetting("timerPresets", localPresets);
  }

  return (
    <div className="settings-panel">
      <h2>Settings</h2>

      {/* Theme Selector */}
      <label>
        Theme:
        <select value={settings.theme} onChange={(e) => updateSetting("theme", e.target.value)}>
          <option value="light">Light</option>
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
      <h3>Timer Presets </h3>
      <label>
        <input type="number" name="focusTime" value={localPresets.focusTime} onChange={handlePresetChange} />
      </label>
      <button onClick={savePresets}>Save Timer Presets</button>
    </div>
  );
}
