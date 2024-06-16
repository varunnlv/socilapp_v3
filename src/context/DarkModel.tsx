import React, { createContext, useEffect, useState, ReactNode } from "react";

// Define the props interface for DarkModeContext
interface DarkModeContextProps {
    darkMode: boolean; // Indicates whether dark mode is enabled or not
    toggle: () => void; // Function to toggle dark mode
}

// Create the DarkModeContext with initial value as undefined
export const DarkModeContext = createContext<DarkModeContextProps | undefined>(
    undefined
);

// Define the props interface for DarkModeContextProvider
interface DarkModeContextProviderProps {
    children: ReactNode; // Children components to be wrapped by DarkModeContextProvider
}

// Define the DarkModeContextProvider component
export const DarkModeContextProvider: React.FC<DarkModeContextProviderProps> = ({
    children,
}) => {
    // State to manage dark mode state, initialized with value from local storage or false if not available
    const [darkMode, setDarkMode] = useState(
        JSON.parse(localStorage.getItem("darkMode") || "false")
    );

    // Function to toggle dark mode state
    const toggle = () => {
        setDarkMode(!darkMode);
    };

    // Effect to update local storage with current dark mode state whenever it changes
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    // Create context value object
    const contextValue: DarkModeContextProps = {
        darkMode,
        toggle,
    };

    // Render DarkModeContextProvider with provided context value and children
    return (
        <DarkModeContext.Provider value={contextValue}>
            {children}
        </DarkModeContext.Provider>
    );
};
