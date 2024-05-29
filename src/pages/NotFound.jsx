import React, { useEffect } from "react";
import { useColorScheme } from "../context/ColorSchemeServices";

export default function NotFound() {
  const { currentScheme, setScheme } = useColorScheme();

  useEffect(() => {
    setScheme("homepage");
  }, [setScheme]);
  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} flex flex-col min-h-screen`}
    >
      <p className="text-8xl pt-10">▽</p>
      <br />
      <p className="text-l">404 - Not Found</p>
      <br />
      <p className="text-l px-5">The page you're looking for doesn't exist.</p>
    </div>
  );
}
