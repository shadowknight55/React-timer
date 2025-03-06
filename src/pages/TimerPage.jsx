import React from 'react';
import TimerState from '../components/timer/TimerState';

const TimerPage = () => {
  return (
    <div className="timer-page">
      <h1>Focus Timer</h1>
      <TimerState initialTime={25} />
    </div>
  );
};

export default TimerPage;
