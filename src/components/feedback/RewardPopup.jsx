import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

/**
 * RewardPopup component to display a list of rewards with images.
 * @param {Array} rewards - Array of rewards, each with a `name` and `image`.
 * @param {function} onClose - Function to close the popup.
 */
const RewardPopup = ({ rewards, onClose }) => {
  return (
    <Box sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 3, boxShadow: 3, zIndex: 1000 }}>
      <Typography variant="h6" gutterBottom>
        Rewards
      </Typography>
      <List>
        {rewards.map((reward, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={reward.image} alt={reward.name} />
            </ListItemAvatar>
            <ListItemText primary={reward.name} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};

export default RewardPopup;
