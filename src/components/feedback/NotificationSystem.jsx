import React, { useEffect } from 'react';

const NotificationSystem = ({ notifications, removeNotification }) => {
  // Effect to automatically remove notifications after 5 seconds
 
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
