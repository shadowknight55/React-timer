import { useState } from 'react';

const useAnalytics = (initialStreak = 0) => {
  const [streak, setStreak] = useState(initialStreak);

  const incrementStreak = () => {
    setStreak((prevStreak) => prevStreak + 1);
  };

  return {
    streak,
    incrementStreak,
  };
};

export default useAnalytics;
