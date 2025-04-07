
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
