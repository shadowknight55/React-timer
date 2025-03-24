import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';
import './StreakHistoryDialog.css'; // Import CSS for fade-in effect

/**
 * StreakHistoryDialog component to display historical streaks in a dialog.
 * @param {boolean} open - Whether the dialog is open.
 * @param {function} onClose - Function to close the dialog.
 * @param {Array} historicalStreaks - Array of historical streaks.
 */
const StreakHistoryDialog = ({ open, onClose, historicalStreaks = [] }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', // Ensure it always starts in the center
          zIndex: 1000, // Ensure it appears above other elements
        },
      }}
    >
      <DialogTitle>Streak History</DialogTitle>
      <DialogContent>
        <List>
          {historicalStreaks.map((streak, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Streak: ${streak.streak} sessions`}
                secondary={`From: ${streak.startDate} To: ${streak.endDate}`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default StreakHistoryDialog;
