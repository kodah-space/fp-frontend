import React, { createContext, useContext, useState } from "react";
import colorSchemes from "./colorSchemes";

const ColorSchemeContext = createContext();

export const ColorSchemeProvider = ({ children }) => {
  const [currentScheme, setCurrentScheme] = useState(colorSchemes.homepage);

  const setScheme = (pageType) => {
    setCurrentScheme(colorSchemes[pageType] || colorSchemes.homepage);
  };

  return (
    <ColorSchemeContext.Provider value={{ currentScheme, setScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => useContext(ColorSchemeContext);
