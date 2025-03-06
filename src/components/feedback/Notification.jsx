import React from 'react';
import { useNotification } from '../../context/NotificationContext';

/**
 * Notification component to display a single notification.
 * @param message - The notification message.
 * @param id - The notification id.
 */
const Notification = ({ message, id }) => {
  const { removeNotification } = useNotification();

  return (
    <div className="notification">
      <p>{message}</p>
      <button onClick={() => removeNotification(id)}>Close</button>
    </div>
  );
};

export default Notification;
