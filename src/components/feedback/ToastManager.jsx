import React, { useEffect } from 'react';

const ToastManager = ({ notifications, removeNotification }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      if (notifications.length > 0) {
        removeNotification();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [notifications, removeNotification]);

  return (
    <div className="toast-manager">
      {notifications.map((notification) => (
        <div key={notification.id} className="toast">
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ToastManager;
