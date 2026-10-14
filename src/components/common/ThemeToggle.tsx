import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div
      className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] transition-colors"
      role="group"
      aria-label="Visual Theme Options (Dark, Light, System)"
    >
      {/* Light Mode Button */}
      <button
        type="button"
        onClick={() => setTheme('light')}
        title="Activate Light Mode"
        aria-label="Activate Light Mode"
        aria-pressed={theme === 'light'}
        className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
          theme === 'light'
            ? 'bg-[#FFFFFF] text-[#365DE8] shadow-sm font-bold'
            : 'text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA]'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Light</span>
      </button>

      {/* Dark Mode Button */}
      <button
        type="button"
        onClick={() => setTheme('dark')}
        title="Activate Dark Mode"
        aria-label="Activate Dark Mode"
        aria-pressed={theme === 'dark'}
        className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
          theme === 'dark'
            ? 'bg-[#192331] text-[#6C8CFF] shadow-sm font-bold'
            : 'text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA]'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Dark</span>
      </button>

      {/* System Theme Button */}
      <button
        type="button"
        onClick={() => setTheme('system')}
        title="Follow System Preference"
        aria-label="Follow System Preference"
        aria-pressed={theme === 'system'}
        className={`p-1.5 rounded-lg transition-all ${
          theme === 'system'
            ? 'bg-[#FFFFFF] dark:bg-[#192331] text-[#6D4AE6] dark:text-[#9B8AFB] shadow-sm'
            : 'text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA]'
        }`}
      >
        <Laptop className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
