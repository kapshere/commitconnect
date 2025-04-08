
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with a default value that won't cause hydration issues
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  // Set the initial theme once the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark));
      setHasInitialized(true);
    }
  }, []);

  // Apply theme changes to the document
  useEffect(() => {
    if (!hasInitialized) return;
    
    const root = window.document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode, hasInitialized]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const value = { isDarkMode, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
