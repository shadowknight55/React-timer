import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

const RewardPopup = ({ rewards, onClose }) => {
  return (
    <Box sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 3, boxShadow: 3, zIndex: 1000 }}>
      <Typography variant="h6" gutterBottom>
        Unearned Rewards
      </Typography>
      <List>
        {rewards.map((reward, index) => (
          <ListItem key={index}>
            <ListItemText primary={reward} />
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
