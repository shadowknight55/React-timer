import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';

/**
 * StreakHistoryDialog component to display historical streaks in a dialog.
 * @param {boolean} open - Whether the dialog is open.
 * @param {function} onClose - Function to close the dialog.
 * @param {Array} historicalStreaks - Array of historical streaks.
 */
const StreakHistoryDialog = ({ open, onClose, historicalStreaks = [] }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
