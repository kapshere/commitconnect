
import { Moon, Sun } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Toggle
      aria-label="Toggle dark mode"
      pressed={isDarkMode}
      onPressedChange={toggleTheme}
      className="border border-gray-200 dark:border-gray-700 rounded-full w-10 h-10 p-1 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {isDarkMode ? (
        <Moon className="h-4 w-4 text-navy-300 dark:text-navy-200" />
      ) : (
        <Sun className="h-4 w-4 text-connect-500 dark:text-connect-300" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
