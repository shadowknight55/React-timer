import React, { useEffect, useState } from 'react';
import useTimer from '../../hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import useAnalytics from '../../hooks/useAnalytics';
import useNotifications from '../../hooks/useNotifications';
import NotificationSystem from '../feedback/NotificationSystem';
import { useSettings } from '../../context/SettingsContext';

/**
 * TimerState component to manage and display the timer state.
 * @param initialTime - The initial time in minutes.
 */
const TimerState = ({ initialTime }) => {
  const { settings } = useSettings();
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

  const { streak, incrementStreak } = useAnalytics();
  const { notifications, addNotification, removeNotification } = useNotifications();
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    if (time === 0 && !hasNotified) {
      incrementStreak();
      addNotification('Timer ended');
      setHasNotified(true);
    }
  }, [time, incrementStreak, addNotification, hasNotified]);

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
      <div>
        <h2>Timer Finished Streak: {streak} times</h2>
      </div>
    </div>
  );
};

export default TimerState;
