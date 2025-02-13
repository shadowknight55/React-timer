# Focus Timer

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
