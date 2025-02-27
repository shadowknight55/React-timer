import React, { useEffect } from 'react';

const NotificationSystem = ({ notifications, removeNotification }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      if (notifications.length > 0) {
        removeNotification(0);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [notifications, removeNotification]);

  return (
    <div className="notification-system">
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
          <button onClick={() => removeNotification(index)}>Close</button>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
