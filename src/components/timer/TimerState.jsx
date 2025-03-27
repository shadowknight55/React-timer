import React, { useEffect, useState } from 'react';
import useTimer from '../../hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import useNotifications from '../../hooks/useNotifications';
import Notification from '../feedback/Notification';
import { useSettings } from '../../context/SettingsContext';
import { useNotification } from '../../context/NotificationContext';

/**
 * TimerState component to manage and display the timer state.
 * @param initialTime - The initial time in minutes.
 */
const TimerState = ({ initialTime }) => {
  const { settings, updateSetting, addSession } = useSettings();
  const { incrementStreak, checkSessionDurationRewards, checkDailyUsageRewards } = useNotification();
  const {
    isRunning,
    onStart,
    onStop,
    onReset,
    hours,
    minutes,
    seconds,
    time,
    volume,
    handleVolumeChange,
    isMuted,
    handleMuteToggle
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
      checkSessionDurationRewards(sessionDuration);
      checkDailyUsageRewards();
      setSessionStartTime(null);
    }
  }, [isRunning, sessionStartTime, settings.sessions, updateSetting, checkSessionDurationRewards, checkDailyUsageRewards]);

  // Effect to handle timer end and notification
  useEffect(() => {
    if (time === 0 && !hasNotified) {
      console.log('Timer ended, showing notification');
      addNotification('Session over, updating streak');
      incrementStreak();
      setHasNotified(true);
      addSession(initialTime * 60); // Add the session when the timer hits 0
    }
  }, [time, addNotification, hasNotified, incrementStreak, addSession, initialTime]);

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

  // Effect to automatically remove the notification after 3 seconds for specific message
  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.message === 'Session over, updating streak') {
        const timer = setTimeout(() => {
          removeNotification(notification.id);
        }, 5000); // Remove notification after 5 seconds

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, removeNotification]);

  return (
    <div>
      <TimerDisplay hours={hours} minutes={minutes} seconds={seconds} />
      <TimerControls
        isRunning={isRunning}
        onStart={onStart}
        onStop={onStop}
        onReset={onReset}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        isMuted={isMuted}
        onMuteToggle={handleMuteToggle}
      />
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          id={notification.id}
          onClose={() => handleNotificationClose(notification.id)}
        />
      ))}
    </div>
  );
};

export default TimerState;
