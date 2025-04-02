import React, { useState, useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';
import TimerState from '../components/timer/TimerState';
import RewardPopup from '../components/feedback/RewardPopup';
import { Container, Typography, Box, Button, Stack, Badge } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LockIcon from '@mui/icons-material/Lock';
import trophyImage from '../assets/trophy.png'; // Trophy image for earned rewards
import placeholderImage from '../assets/image.png'; // Placeholder image for unearned rewards

const TimerPage = () => {
  const { rewards, allRewards, addReward } = useNotification();
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
  }, [rewards, addReward]);

  return (
    <Container maxWidth="sm" sx={{ 
      backgroundColor: '#333',
      color: '#fff',
      borderRadius: 1,
      py: 2
    }}>
      <Box sx={{ 
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <TimerState />
      </Box>

      <Stack 
        direction="row" 
        spacing={2} 
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        <Button 
          variant="outlined"
          onClick={() => setShowEarnedRewardPopup(true)}
          startIcon={<EmojiEventsIcon />}
          size="small"
          color="primary"
          sx={{ 
            borderRadius: 2,
            minWidth: 160,
            justifyContent: 'flex-start'
          }}
        >
          <Badge 
            badgeContent={rewards.length} 
            color="primary"
            sx={{ 
              '& .MuiBadge-badge': {
                right: -20,
              }
            }}
          >
            Earned Rewards
          </Badge>
        </Button>
        
        <Button 
          variant="outlined"
          onClick={() => setShowUnearnedRewardPopup(true)}
          startIcon={<LockIcon />}
          size="small"
          color="secondary"
          sx={{ 
            borderRadius: 2,
            minWidth: 160,
            justifyContent: 'flex-start'
          }}
        >
          <Badge 
            badgeContent={unearnedRewards.length} 
            color="secondary"
            sx={{ 
              '& .MuiBadge-badge': {
                right: -20,
              }
            }}
          >
            Locked Rewards
          </Badge>
        </Button>
      </Stack>

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
    </Container>
  );
};

export default TimerPage;
