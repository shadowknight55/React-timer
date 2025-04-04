# React Timer
Week 1
-Bulit basic timer 
Week 2
add funtion to timer so it could count down 
week 3 
Added setting page to custom mizes timer
Added home page
Added progress page to see streak and chart
week 4
Add hours to timer rewards and the abilty to see them and made app look nicer
week 5
added sound to my app and fixed local storage
week6
added sample data and two more charts that can be switched around 
## Overview
This is a simple timmer app made with react and vite it was made to help people fouces and a few of its features include
Streaks
streak history
a way to earn rewards and view ones you have not gotten
a chat to show your progress in 3 different ways
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

- `src/hooks/useTimer.js`: Custom hook to manage the timer state and logic.
-`src/componets/charts/BarChartComponent.jsx`: Component to display bar chart data
- `src/components/charts/LineChartComponent.jsx`: Component to display line chart data
- `src/components/charts/PieChartComponent.jsx`: Component to display pie chart data
- `src/components/timer/TimerState.jsx`: Component to manage and display the timer state.
- `src/components/timer/TimerControls.jsx`: Component to manage timer controls (start, stop, reset).
- `src/components/timer/TimerDisplay.jsx`: Component to display the remaining time.
- `src/components/common/ErrorBoundary.jsx`: Component to catch and handle errors in the component tree.
- `src/components/common/Button.jsx`: Reusable button component.
- `src/components/nav/NavBar.jsx`: Component for the navigation bar.
- `src/components/settings/SettingsPanel.jsx`: Component for the settings panel.
- `src/context/SettingsContext.jsx`: Context for managing settings.
- `src/components/feedback/NotificationSystem.jsx`: Component for displaying notifications.
- `src/components/feedback/Notification.jsx`: Component to display a single notification.
- `src/context/NotificationContext.jsx`: Context for managing notifications and rewards.
- `src/pages/HomePage.jsx`: Component for the home page.
- `src/pages/ProgressPage.jsx`: Component for the progress page.
- `src/pages/Timer.jsx`: Component for the timer
- `src/App.jsx`: Main application component.

## Dependencies List
- React
- React DOM
- React Router DOM
- @emotion/react
- @emotion/styled
- styled-components
-  Mui
- Recharts

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

