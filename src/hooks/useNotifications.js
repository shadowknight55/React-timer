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

  const removeNotification = () => {
    setNotifications((prevNotifications) => prevNotifications.slice(1));
  };

  return { notifications, addNotification, removeNotification };
};

export default useNotifications;
