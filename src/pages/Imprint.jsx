import React, { useEffect } from "react";
import { useColorScheme } from "../context/ColorSchemeServices";

function Imprint() {
  const { currentScheme, setScheme } = useColorScheme();

  useEffect(() => {
    setScheme("homepage");
  }, [setScheme]);

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} min-h-screen flex flex-col`}
    >
      Imprint and Contact Information
    </div>
  );
}

export default Imprint;
