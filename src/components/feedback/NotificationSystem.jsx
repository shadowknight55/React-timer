import React from 'react';

const NotificationSystem = ({ notifications, removeNotification }) => {
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
