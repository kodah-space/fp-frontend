import React from "react";
import { Link } from "react-router-dom";
import { useColorScheme } from "../context/ColorSchemeServices";

export default function Footer() {
  const { currentScheme } = useColorScheme();

  return (
    <footer
      className={`${currentScheme.footer.background} ${currentScheme.footer.text} fixed bottom-0 w-full`}
    >
      <div className="text-xs">
        <span>© 2024 </span>
        <span className="px-2"> • </span>
        <Link to="/Imprint">
          <span className="no-underline hover:underline">Imprint</span>
        </Link>
      </div>
    </footer>
  );
}
