
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";

const ThemeToggle = () => {
  // Initialize theme from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  // Apply theme to document when component mounts and when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <Toggle
      aria-label="Toggle dark mode"
      pressed={isDarkMode}
      onPressedChange={setIsDarkMode}
      className="border border-gray-200 dark:border-gray-800 rounded-full w-10 h-10 p-1 flex items-center justify-center"
    >
      {isDarkMode ? (
        <Moon className="h-4 w-4 text-connect-200" />
      ) : (
        <Sun className="h-4 w-4 text-connect-500" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
