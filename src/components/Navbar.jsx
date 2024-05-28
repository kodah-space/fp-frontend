import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context"; // <== IMPORT
import React from "react";
import { useColorScheme } from "../context/ColorSchemeServices";

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

  //  Update the rendering logic to display different content
  //  depending on whether the user is logged in or not
  return (
    <nav
      className={`${navbarScheme.background} ${navbarScheme.text} flex items-center justify-between`}
    >
      <div className="max-w-screen-xl md:px-5 flex mx-auto padding-bottom-0 justify-start">
        <Link to="/" className="flex space-x-3 rtl:space-x-reverse">
          <span className="text-2xl font-['Unbounded-Medium'] whitespace-nowrap px-2 py-1">
            kandi
          </span>
        </Link>
      </div>
      <div className="flex flex-wrap">
        <div className="text-sm">
          <div className="px-2 no-underline hover:underline">
            {isLoggedIn && (
              <>
                <Link to={`/users/${user.userName}`}>△ {user.name}</Link>
              </>
            )}
          </div>
        </div>
        <div>
          <div>
            <div className="text-sm px-2">
              {isLoggedIn && (
                <>
                  <button
                    className="no-underline hover:underline"
                    onClick={logOutUser}
                  >
                    ▷ Logout
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-wrap text-sm no-underline hover:underline">
              {!isLoggedIn && (
                <>
                  <Link to="/signup" className="px-2">
                    ▷ Sign Up
                  </Link>
                  <Link to="/login" className="px-2">
                    ▷ Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
