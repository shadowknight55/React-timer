import React from 'react';

const Card = ({ darkMode, setDarkMode }) => {
    return (
        <div className="card">
            <button onClick={() => setDarkMode(!darkMode)}>
                Toggle Dark Mode
            </button>
            {/* Other card content can go here */}
        </div>
    );
};

export default Card;
