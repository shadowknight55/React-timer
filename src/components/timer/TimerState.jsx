import React, { useEffect, useState, useRef } from 'react';
import useTimer from '../../hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import useNotifications from '../../hooks/useNotifications';
import NotificationSystem from '../feedback/NotificationSystem';
import { useSettings } from '../settings/SettingsContext';

/**
 * TimerState component to manage and display the timer state.
 * @param initialTime - The initial time in minutes.
 */
const TimerState = ({ initialTime }) => {
  const { settings, incrementStreak } = useSettings();
  const {
    customTime,
    setCustomTime,
    isRunning,
    onStart,
    onStop,
    onReset,
    minutes,
    seconds,
    time,
  } = useTimer(settings.timerPresets.focusTime);

  const { notifications, addNotification, removeNotification } = useNotifications();
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    if (time === 0 && !hasNotified) {
      addNotification('Timer ended');
      incrementStreak();
      setHasNotified(true);
    }
  }, [time, addNotification, hasNotified, incrementStreak]);

  useEffect(() => {
    if (time > 0) {
      setHasNotified(false);
    }
  }, [time]);

  return (
    <div>
      <TimerDisplay minutes={minutes} seconds={seconds} />
      <TimerControls
        customTime={customTime}
        setCustomTime={setCustomTime}
        isRunning={isRunning}
        onStart={onStart}
        onStop={onStop}
        onReset={onReset}
      />
      <NotificationSystem notifications={notifications} removeNotification={removeNotification} />
    </div>
  );
};

export default TimerState;
