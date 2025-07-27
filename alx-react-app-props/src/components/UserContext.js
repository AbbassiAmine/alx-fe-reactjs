import React from 'react';

// Create a Context with an optional default value
const UserContext = React.createContext();

// Example with a specific default value
const ThemeContext = React.createContext({
    theme: 'light',
    toggleTheme: () => { }
});

export default UserContext;