import { useState } from 'react';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, message },
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) => prevNotifications.filter(notification => notification.id !== id));
  };

  return { notifications, addNotification, removeNotification };
};

export default useNotifications;
