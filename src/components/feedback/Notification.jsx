import React, { useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';
import notificationSound from '../../audio/animal_crossing.mp3'; // Ensure the path is correct

/**
 * Notification component to display a single notification.
 * @param message - The notification message.
 * @param id - The notification id.
 */
const Notification = ({ message, id }) => {
  const { removeNotification } = useNotification();

  useEffect(() => {
    const audio = new Audio(notificationSound);
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  }, [id, message, removeNotification]);

  return (
    <div className="notification">
      <p>{message}</p>
      <button onClick={() => removeNotification(id)}>Close</button>
    </div>
  );
};

export default Notification;
