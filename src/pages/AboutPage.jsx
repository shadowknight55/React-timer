import React from 'react';

/**
 * AboutPage component to display information about the app.
 */
const AboutPage = () => {
  return (
    <div
      style={{
        width: '100%', // Full width
        height: '100vh', // Full viewport height
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <h1>About</h1>
      <p>
        Welcome to the React Timer App! This app helps you track your progress, manage your time, and achieve your goals.
      </p>
      <p>
        Use the timer to focus on tasks, view your progress in the progress page, and customize your settings in the settings panel.
      </p>
    </div>
  );
};

export default AboutPage;
