import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import './RewardPopup.css'; // Import CSS for fade-in effect

/**
 * RewardPopup component to display a list of rewards with images.
 * @param {Array} rewards - Array of rewards, each with a `name` and `image`.
 * @param {function} onClose - Function to close the popup.
 */
const RewardPopup = ({ rewards, onClose }) => {
  return (
    <Box
      className="reward-popup" // Apply reward-popup class
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Ensure it always starts in the center
        backgroundColor: '#333', // Change from 'white' to '#333'
        padding: 3,
        boxShadow: 3,
        zIndex: 1000, // Ensure it appears above other elements
        color: '#fff' // Add white text for contrast
      }}
    >
      <Typography variant="h6" gutterBottom>
        Rewards
      </Typography>
      <List>
        {rewards.map((reward, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={reward.image} alt={reward.name} />
            </ListItemAvatar>
            <ListItemText 
              primary={reward.name} 
              sx={{ 
                '& .MuiListItemText-primary': {
                  color: '#fff' // Make text white for contrast
                }
              }}
            />
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
