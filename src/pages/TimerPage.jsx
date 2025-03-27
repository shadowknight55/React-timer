import React, { useState, useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';
import TimerState from '../components/timer/TimerState';
import RewardPopup from '../components/feedback/RewardPopup';
import trophyImage from '../assets/trophy.png'; // Trophy image for earned rewards
import placeholderImage from '../assets/image.png'; // Placeholder image for unearned rewards

const TimerPage = () => {
  const { rewards, allRewards } = useNotification();
  const [showEarnedRewardPopup, setShowEarnedRewardPopup] = useState(false);
  const [showUnearnedRewardPopup, setShowUnearnedRewardPopup] = useState(false);

  // Filter out earned rewards to get unearned ones
  const unearnedRewards = allRewards.filter(reward => !rewards.includes(reward));

  // Load rewards from localStorage on component mount
  useEffect(() => {
    const savedRewards = localStorage.getItem('rewards');
    if (savedRewards) {
      const parsedRewards = JSON.parse(savedRewards);
      // Update the rewards in context if they exist in localStorage
      if (parsedRewards.length > 0) {
        parsedRewards.forEach(reward => {
          if (!rewards.includes(reward)) {
            addReward(reward);
          }
        });
      }
    }
  }, []);

  return (
    <div className="timer-page" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Focus Timer</h1>
      <TimerState initialTime={25} />

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button 
          onClick={() => setShowEarnedRewardPopup(true)}
          className="reward-button"
        >
          Show Earned Rewards ({rewards.length})
        </button>
        <button 
          onClick={() => setShowUnearnedRewardPopup(true)}
          className="reward-button"
        >
          Show Unearned Rewards ({unearnedRewards.length})
        </button>
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
