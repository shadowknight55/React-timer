import React, { useState } from 'react';
import StreakCounter from './components/analytics/StreakCounter';
import './App.css'; // Importing the CSS for styling
import Card from './components/Card';
import ErrorBoundary from './components/common/ErrorBoundary'; // Import ErrorBoundary

const App = () => {
    // State to manage custom time for the timer
    const [customTime, setCustomTime] = useState(25); // Set custom time to 25 minutes

    return (
        // Main render of the App component
        <div> 
            <h1>Focus Timer</h1> 
            <StreakCounter />
            <ErrorBoundary>

                <Card initialTime={customTime} />
            </ErrorBoundary>
        </div> 
    ); 
}; 

export default App;
