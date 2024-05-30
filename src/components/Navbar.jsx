import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context"; // <== IMPORT
import React from "react";
import { useColorScheme } from "../context/ColorSchemeServices";
import { useEffect } from "react";

function Navbar() {
  const { currentScheme } = useColorScheme();
  const navbarScheme = currentScheme?.navbar;
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const {
    isLoggedIn,
    user, // <== UPDATE
    logOutUser,
  } = useContext(AuthContext); // <== ADD

  return (
    <nav
      className={`${navbarScheme.background} ${navbarScheme.text} flex justify-between items-center`}
    >
      <div className="flex items-center">
        <Link to="/" className="flex space-x-3 rtl:space-x-reverse">
          <span className="text-2xl font-['Unbounded-Medium'] whitespace-nowrap px-4 py-1">
            kandi
          </span>
        </Link>
      </div>
      <div className="flex items-center">
        {isLoggedIn && (
          <>
            <div className="text-sm px-2 no-underline hover:underline">
              <Link to={`/users/${user.userName}`}>△ {user.name}</Link>
            </div>
            <button
              className="text-sm pr-4 no-underline hover:underline"
              onClick={logOutUser}
            >
              ▷ Logout
            </button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link
              to="/signup"
              className="text-sm px-2 no-underline hover:underline"
            >
              ▷ Sign Up
            </Link>
            <Link
              to="/login"
              className="text-sm px-4 no-underline hover:underline"
            >
              ▷ Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
