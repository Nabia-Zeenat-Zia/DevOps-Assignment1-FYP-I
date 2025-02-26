import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import { Colors } from "../Constants/Colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = Appearance.getColorScheme() ?? "light";
  const [theme, setTheme] = useState(systemColorScheme);

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (!isCustomTheme) {
        setTheme(colorScheme ?? "light");
      }
    });
    return () => listener.remove();
  }, []);

  const [isCustomTheme, setIsCustomTheme] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setIsCustomTheme(true);
  };

  const resetToSystemTheme = () => {
    setTheme(systemColorScheme);
    setIsCustomTheme(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: Colors[theme],
        toggleTheme,
        resetToSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
