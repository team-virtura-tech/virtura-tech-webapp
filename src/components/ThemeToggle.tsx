import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if the theme is dark, with a default value
  const isDark = mounted && resolvedTheme ? resolvedTheme === 'dark' : false;

  if (!mounted || !resolvedTheme) {
    // Return a placeholder that matches the server render
    return (
      <div className="flex items-center space-x-2">
        <Sun className="text-muted-foreground h-[1.2rem] w-[1.2rem]" />
        <Switch disabled checked={false} aria-label="Toggle theme" />
        <Moon className="text-muted-foreground h-[1.2rem] w-[1.2rem]" />
      </div>
    );
  }

  const toggleTheme = () => {
    // If the current theme is system, switch to the opposite of the resolved theme
    // Otherwise, switch between light and dark
    if (theme === 'system') {
      setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
    } else {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  return (
    <div className="flex items-center space-x-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark
            ? 'text-muted-foreground scale-75 rotate-12'
            : 'text-foreground scale-100 rotate-0'
        }`}
      />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
        className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110"
      />
      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          !isDark
            ? 'text-muted-foreground scale-75 rotate-12'
            : 'text-foreground scale-100 rotate-0'
        }`}
      />
    </div>
  );
};
