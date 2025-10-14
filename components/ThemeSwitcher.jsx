"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
   const [isClient, setIsClient] = useState(false)

     useEffect(() => {
    setIsClient(true)
  }, [])

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full transition-colors duration-300 bg-background"
    >
      {isClient ? theme === "light" ? <Moon size={20} /> : <Sun size={20} /> : '' }
    </button>
  );
}
