import React from 'react';
import { Container, Button, Box } from '@mui/material';
import { Link as MuiLink } from '@mui/material';

/**
 * AboutPage component to display information about the app.
 */
const AboutPage = () => {
  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: 1,
        py: 2,
        height: 'calc(100vh - 48px)', // Subtract navbar height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <h1>About</h1>
      <p>
        Welcome to the React Timer App! This app helps you track your progress, manage your time, and achieve your goals.
      </p>
      <p>
        Use the timer to focus on tasks, view your progress in the progress page, and customize your settings in the settings panel.
      </p>
      <Box sx={{ mt: 4 }}>
        <Button
          component={MuiLink}
          href="https://docs.google.com/forms/d/1mYm0iVxzL7TQWY-jn1JhOh0sCmLxVnDOE8OvVyqS5mY/edit"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#646cff',
            '&:hover': {
              backgroundColor: '#535bf2',
            },
          }}
        >
          Take Our Survey
        </Button>
      </Box>
    </Container>
  );
};

export default AboutPage;
