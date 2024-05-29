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
      <h2>Contact</h2>
      <div className="text-l text-left p-5">
        <p>Kandisky</p>
        <p>Team Alley</p>
        <p>Team Town</p>
        <p>Team@team.com</p>
      </div>
      <h2>Project Code</h2>
      <div className="text-l text-left p-5">
        <a href="">GitHub Repo</a>
      </div>
    </div>
  );
}

export default Imprint;
