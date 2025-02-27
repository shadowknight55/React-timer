# React Timer

## Overview
This is a focus timer that can help with work or anything when you need to focus for a set time

## Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
   ```bash
   cd React-timer
   ```
3. **Install the dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm start
   ```
5. **Open your browser and go to [http://localhost:3000](http://localhost:3000).**

## Project Structure

- `src/hooks/useTimer.ts`: Custom hook to manage the timer state and logic.
- `src/components/timer/TimerState.jsx`: Component to manage and display the timer state.
- `src/components/timer/TimerControls.jsx`: Component to manage timer controls (start, stop, reset).
- `src/components/timer/TimerDisplay.jsx`: Component to display the remaining time.
- `src/components/common/ErrorBoundary.jsx`: Component to catch and handle errors in the component tree.
- `src/components/common/Button.jsx`: Reusable button component.
- `src/components/common/Card.jsx`: Component to wrap the timer state and display.
- `src/components/nav/NavBar.jsx`: Component for the navigation bar.
- `src/components/settings/SettingsPanel.jsx`: Component for the settings panel.
- `src/components/settings/SettingsContext.jsx`: Context for managing settings.
- `src/components/feedback/NotificationSystem.jsx`: Component for displaying notifications.
- `src/pages/HomePage.jsx`: Component for the home page.
- `src/pages/ProgressPage.jsx`: Component for the progress page.
- `src/App.jsx`: Main application component.

## Dependencies List
- React
- React DOM
- React Scripts
- web-vitals

## Usage Guidelines
1. **Set the Timer:**
   - Use the input field to set the timer in minutes.
2. **Start the Timer:**
   - Click the "Start" button to begin the timer.
3. **Pause the Timer:**
   - Click the "Stop" button to pause the timer.
4. **Reset the Timer:**
   - Click the "Reset" button to return the timer to the default time of 25 minutes.

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application using `npm start`.

