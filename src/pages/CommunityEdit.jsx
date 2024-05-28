import React, { useState, useContext, useEffect } from "react";
import CommunityServices from "../context/CommunityServices";
import { useColorScheme } from "../context/ColorSchemeServices";

function CommunityEdit() {
  const { currentScheme, setScheme } = useColorScheme();

  useEffect(() => {
    setScheme("communitypage");
  }, [setScheme]);

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} min-h-screen flex flex-col`}
    >
      CommunityEdit
    </div>
  );
}

export default CommunityEdit;
