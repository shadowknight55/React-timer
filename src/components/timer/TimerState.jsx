import React, { useEffect, useState } from 'react';
import useTimer from '../../hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import useNotifications from '../../hooks/useNotifications';
import Notification from '../feedback/Notification';
import { useSettings } from '../../context/SettingsContext';

/**
 * TimerState component to manage and display the timer state.
 * @param initialTime - The initial time in minutes.
 */
const TimerState = ({ initialTime }) => {
  const { settings, incrementStreak, updateSetting } = useSettings();
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
  const [sessionStartTime, setSessionStartTime] = useState(null);

  // Effect to handle session start and stop
  useEffect(() => {
    if (isRunning && sessionStartTime === null) {
      setSessionStartTime(Date.now());
    } else if (!isRunning && sessionStartTime !== null) {
      const sessionDuration = (Date.now() - sessionStartTime) / 1000; // Duration in seconds
      const newSession = { duration: sessionDuration, timestamp: new Date() };
      const updatedSessions = [...settings.sessions, newSession];
      updateSetting('sessions', updatedSessions);
      setSessionStartTime(null);
    }
  }, [isRunning, sessionStartTime, settings.sessions, updateSetting]);

  // Effect to handle timer end and notification
  useEffect(() => {
    if (time === 0 && !hasNotified) {
      console.log('Timer ended, showing notification');
      addNotification('Session over, updating streak');
      incrementStreak();
      setHasNotified(true);
    }
  }, [time, addNotification, hasNotified, incrementStreak]);

  // Effect to reset notification state when time is greater than 0
  useEffect(() => {
    if (time > 0) {
      setHasNotified(false);
    }
  }, [time]);

  // Function to handle notification close
  const handleNotificationClose = (id) => {
    removeNotification(id);
  };

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
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          onClose={() => handleNotificationClose(notification.id)}
        />
      ))}
    </div>
  );
};

export default TimerState;
