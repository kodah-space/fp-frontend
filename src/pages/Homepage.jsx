import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useColorScheme } from "../context/ColorSchemeServices";
import { useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const API_URL = "http://localhost:5005";

function Homepage() {
  const { currentScheme, setScheme } = useColorScheme();

  const { user, storeToken, authenticateUser, setUser, isLoggedIn } =
    useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Setting scheme to homepage");
    setScheme("homepage");
  }, [setScheme]);

  useEffect(() => {
    if (isLoggedIn && user) {
    } else {
    }
  }, [isLoggedIn, user, navigate]);

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} flex flex-col min-h-screen`}
    >
      {!isLoggedIn && (
        <h1 className="text-2xl font-bold underline py-5">
          Join kandi & make things happen
        </h1>
      )}

      {isLoggedIn && (
        <h1 className="text-2xl font-bold underline py-5">
          Hi {user.name}! Welcome to Kandi
        </h1>
      )}

      <p className="px-4">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren.
      </p>
      <br />

      {!isLoggedIn && (
        <Link to="/login" className="no-underline hover:underline pb-4">
          ▷ Sign Up
        </Link>
      )}

      {isLoggedIn && (
        <Link
          to={`/users/${user.userName}`}
          className="no-underline hover:underline pb-4"
        >
          ▷ Your Profile
        </Link>
      )}
      <div className="border-2 mx-5 mt-5 mb-24 border-[#E2DD68] text-left">
        <h2 className="font-bold text-xl underline p-4">Community Rules</h2>
        <p className="text-sm px-4 pb-4">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. <br /> <br />
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
          dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. <br /> <br />
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet.
        </p>
      </div>
    </div>
  );
}

export default Homepage;
