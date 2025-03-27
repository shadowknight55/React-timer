import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Box,
  Divider,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

/**
 * StreakHistoryDialog component to display historical streaks in a dialog.
 * @param {boolean} open - Whether the dialog is open.
 * @param {function} onClose - Function to close the dialog.
 * @param {Array} historicalStreaks - Array of historical streaks.
 */
const StreakHistoryDialog = ({ open, onClose, historicalStreaks = [] }) => {
  const theme = useTheme();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 1,
          backgroundColor: theme.palette.background.paper,
          '& .MuiDialogContent-root': {
            p: 0.75
          }
        },
      }}
    >
      <DialogTitle sx={{ p: 0.75 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Streak History
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            size="small"
            sx={{ p: 0.25 }}
          >
            <CloseIcon sx={{ fontSize: '0.875rem' }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {historicalStreaks.length === 0 ? (
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 0.75,
              color: theme.palette.text.secondary
            }}
          >
            <WhatshotIcon sx={{ fontSize: 24, mb: 0.25, color: theme.palette.primary.main }} />
            <Typography variant="caption" sx={{ display: 'block', mb: 0.25 }}>
              No Streak History Yet
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
              Complete sessions to start building your streak history!
            </Typography>
          </Box>
        ) : (
          <List disablePadding dense>
            {historicalStreaks.map((streak, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <WhatshotIcon 
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontSize: 16
                      }} 
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="caption">
                        {streak.streak} Session{streak.streak !== 1 ? 's' : ''}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarTodayIcon 
                          sx={{ 
                            fontSize: 10, 
                            mr: 0.25,
                            color: theme.palette.text.secondary
                          }} 
                        />
                        <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
                          {formatDate(streak.startDate)} - {formatDate(streak.endDate)}
                        </Typography>
                      </Box>
                    }
                    sx={{
                      my: 0,
                      '& .MuiListItemText-primary': { mb: 0 },
                      '& .MuiListItemText-secondary': { mt: 0 }
                    }}
                  />
                </ListItem>
                {index < historicalStreaks.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StreakHistoryDialog;
