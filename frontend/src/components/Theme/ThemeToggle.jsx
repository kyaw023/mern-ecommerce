import React, { useLayoutEffect } from "react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Sun, Moon, Monitor } from "lucide-react";
import axios from "axios";

const ThemeToggle = ({ userId }) => {
  const [theme, setTheme] = useState("system");

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeMode) => {
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    document.documentElement.setAttribute(
      "data-theme",
      themeMode === "system" ? systemPreference : themeMode
    );
    if (themeMode === "system") {
      document.documentElement.classList.toggle(
        "dark",
        systemPreference === "dark"
      );
    } else {
      document.documentElement.classList.toggle("dark", themeMode === "dark");
    }
  };

  const handleThemeChange = async (selectedTheme) => {
    setTheme(selectedTheme);
    applyTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);

    try {
      const res = await axios.put("/api/users/theme", {
        userId,
        theme: selectedTheme,
      });

      console.log(res);
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 rounded-md dark:bg-dark-card bg-light-card">
        {theme === "system" && (
          <Monitor className="w-5 h-5 text-light-text dark:text-dark-text" />
        )}
        {theme === "light" && (
          <Sun className="w-5 h-5 text-light-text dark:text-dark-text" />
        )}
        {theme === "dark" && (
          <Moon className="w-5 h-5 text-light-text dark:text-dark-text" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-light-background dark:bg-dark-background"
      >
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          <Sun className="w-5 h-5 mr-2 text-light-text dark:text-dark-text" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          <Moon className="w-5 h-5 mr-2 text-light-text dark:text-dark-text" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>
          <Monitor className="w-5 h-5 mr-2 text-light-text dark:text-dark-text" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
