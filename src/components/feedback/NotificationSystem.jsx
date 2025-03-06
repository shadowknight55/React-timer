import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import Notification from './Notification';

const NotificationSystem = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="notification-system">
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>
  );
};

export default NotificationSystem;
