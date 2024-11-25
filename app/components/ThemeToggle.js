"use client";

import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
    </button>
  );
}
