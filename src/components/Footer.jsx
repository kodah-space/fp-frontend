import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <span>© 2024</span>
      <Link to="/Imprint">
        <span>Imprint</span>
      </Link>
    </footer>
  );
}
