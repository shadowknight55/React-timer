import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import TimerState from '../components/timer/TimerState';
import RewardPopup from '../components/feedback/RewardPopup';
import trophyImage from '../assets/trophy.png'; // Trophy image for earned rewards
import placeholderImage from '../assets/image.png'; // Placeholder image for unearned rewards

const TimerPage = () => {
  const { rewards, allRewards } = useNotification();
  const [showEarnedRewardPopup, setShowEarnedRewardPopup] = useState(false);
  const [showUnearnedRewardPopup, setShowUnearnedRewardPopup] = useState(false);

  const unearnedRewards = allRewards.filter(reward => !rewards.includes(reward));

  return (
    <div className="timer-page" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Focus Timer</h1>
      <TimerState initialTime={25} />

      {/* Earned Rewards Section */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => setShowEarnedRewardPopup(true)}>Show All Earned Rewards</button>
      </div>

      {/* Unearned Rewards Section */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => setShowUnearnedRewardPopup(true)}>Show All Unearned Rewards</button>
      </div>

      {/* Earned Rewards Popup */}
      {showEarnedRewardPopup && (
        <RewardPopup
          rewards={rewards.map(reward => ({
            name: reward,
            image: trophyImage,
          }))}
          onClose={() => setShowEarnedRewardPopup(false)}
        />
      )}

      {/* Unearned Rewards Popup */}
      {showUnearnedRewardPopup && (
        <RewardPopup
          rewards={unearnedRewards.map(reward => ({
            name: reward,
            image: placeholderImage,
          }))}
          onClose={() => setShowUnearnedRewardPopup(false)}
        />
      )}
    </div>
  );
};

export default TimerPage;
