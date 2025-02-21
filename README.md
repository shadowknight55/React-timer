# React Timer

## Overview

This project is a focus timer built with React. It allows users to set a custom time, start, stop, and reset the timer. The timer state and logic are managed using a custom hook, and the components are structured to promote reusability and separation of concerns.

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
- `src/components/Card.jsx`: Component to wrap the timer state and display.
- `src/App.jsx`: Main application component.

## Rationale

### Custom Hook (`useTimer`)

The `useTimer` hook encapsulates the timer state and logic, making it reusable and easy to manage. By using a custom hook, we can keep the timer logic separate from the UI components, promoting a clean and maintainable codebase.

### TimerState Component

The `TimerState` component uses the `useTimer` hook to manage the timer state and passes the necessary props to the `TimerDisplay` and `TimerControls` components. This separation of concerns ensures that each component has a single responsibility.

### TimerControls Component

The `TimerControls` component provides the user interface for controlling the timer. It uses a reusable `Button` component to ensure consistency and reduce duplication.

### ErrorBoundary Component

The `ErrorBoundary` component catches JavaScript errors anywhere in the child component tree, logs those errors, and displays a fallback UI. This improves the robustness of the application by preventing it from crashing due to unhandled errors.

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
5. **Toggle Dark Mode:**
   - Use the "Toggle Dark Mode" button to switch between light and dark themes.

## Component Documentation
- **App:** Main component that renders the Card component.
- **Card:** Manages the timer state and displays the TimerDisplay and TimerControls components.
- **TimerDisplay:** Shows the formatted timer value.
- **TimerControls:** Contains input and buttons for controlling the timer.

## Development Notes
- The project uses Create React App for easy setup and development.
- Ensure to keep dependencies updated to avoid deprecation warnings.
- Consider implementing additional features such as:
  - Customizable timer intervals
  - Alert notifications when the timer expires
  - Integration with external APIs for enhanced functionality
- Follow best practices for code organization, commenting, and testing to ensure maintainability and scalability.

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application using `npm start`.

