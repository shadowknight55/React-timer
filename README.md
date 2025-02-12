# Focus Timer

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd React-timer
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Dependencies List
- React
- React DOM
- React Scripts
- web-vitals

## Usage Guidelines
- Use the input field to set the timer in minutes.
- Click "Start" to begin the timer.
- Use "Stop" to pause the timer and "Reset" to return to the default time of 25 minutes.
- Toggle dark mode using the "Toggle Dark Mode" button.

## Component Documentation
- **App**: Main component that manages the timer state and renders the Card component.
- **Card**: Displays the timer and controls for starting, stopping, and resetting the timer.
- **TimerDisplay**: Shows the formatted timer value.
- **TimerControls**: Contains buttons for controlling the timer.

## Development Notes
- The project uses Create React App for easy setup and development.
- Ensure to keep dependencies updated to avoid deprecation warnings.
