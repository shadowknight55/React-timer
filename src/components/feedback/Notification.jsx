import React from 'react';
import { useNotification } from '../../context/NotificationContext';

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
