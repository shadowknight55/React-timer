import React, { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';

const ProgressPage = () => {
  const { settings } = useSettings();
  const [streak, setStreak] = useState(settings.streak || 0);

  useEffect(() => {
    setStreak(settings.streak);
  }, [settings.streak]);

  return (
    <div>
      <h1>Progress</h1>
      <p>Track your progress here.</p>
      <div className="streak-display">
        <p>Number of timers finished: {streak}</p>
      </div>
    </div>
  );
};

export default ProgressPage;
