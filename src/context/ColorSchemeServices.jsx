import React, { createContext, useContext, useState, useEffect } from "react";
import colorSchemes from "./colorSchemes";

const ColorSchemeContext = createContext();

export const ColorSchemeProvider = ({ children }) => {
  const [currentScheme, setCurrentScheme] = useState(colorSchemes.homepage);

  const setScheme = (pageType) => {
    setCurrentScheme(colorSchemes[pageType] || colorSchemes.homepage);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--border-color",
      currentScheme.text
    );
  }, [currentScheme]);

  return (
    <ColorSchemeContext.Provider value={{ currentScheme, setScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => useContext(ColorSchemeContext);
