import React, { useState, useContext, useEffect } from "react";
import CommunityServices from "../context/CommunityServices";
import { useColorScheme } from "../context/ColorSchemeServices";

function EventEdit() {
  const { currentScheme, setScheme } = useColorScheme();

  useEffect(() => {
    setScheme("eventpage");
  }, [setScheme]);

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} min-h-screen flex flex-col`}
    >
      Event Edit Page
    </div>
  );
}

export default EventEdit;
