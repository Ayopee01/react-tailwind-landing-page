import React, { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from "react-icons/md";

// Theme options
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

function DarkModeToggle({ showText = false, size = 24, className = '' }) {
  // Get initial theme from localStorage or default to light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || THEMES.LIGHT;
  });
  
  // Track if dark mode is currently active (for UI purposes)
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === THEMES.DARK);

  // Apply theme effect
  useEffect(() => {
    // Function to update the DOM based on theme
    const updateTheme = () => {
      const isDarkTheme = theme === THEMES.DARK;
      document.documentElement.classList.toggle('dark', isDarkTheme);
      setIsDark(isDarkTheme);
    };

    // Save theme to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply theme
    updateTheme();
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  };

  // Function to directly set to a specific theme
  const setSpecificTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  // Determine which icon to show
  const getIcon = () => {
    return theme === THEMES.DARK 
      ? <MdDarkMode className="text-violet-400" size={size} />
      : <MdLightMode className="text-yellow-400" size={size} />;
  };

  return (
    <div className='fixed bottom-5 right-5 z-20'>
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center rounded-full border border-gray-500 cursor-pointer p-3 rounded-full shadow-md bg-gray-800 dark:bg-gray-100 hover:bg-gray-700 scale-105 transition-all duration-300 transform dark:hover:bg-gray-200 "
      >
        <span className="transition-transform duration-300">{getIcon()}</span>
      </button>
    </div>
  );
}

// Export component and theme constants for external usage
export { DarkModeToggle as default, THEMES };

