import React from 'react';
import TimerState from '../timer/TimerState';
import { useSettings } from '../../context/SettingsContext';

const Card = () => {
  const { settings } = useSettings();

  return (
    <div className="card">
      <TimerState initialTime={settings.timerDuration} />
    </div>
  );
};

export default Card;