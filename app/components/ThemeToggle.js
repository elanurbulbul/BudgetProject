"use client";

import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
    >
      {theme === "light" ? "Dark Mode'a Geç" : "Light Mode'dan Çık"}
    </button>
  );
}
