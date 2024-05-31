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
          Hi {user.name}! Welcome to kandi
        </h1>
      )}

      <p className="px-4">
        You have a plans? A festival in the woods? A songwriting workshop with
        your music fellows? Grandma’s 80s? <br />
        kandi helps you to build communities of people who share the same
        interests and organize community events. Find your people and share your
        skills.
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
          kandi is dedicated to providing a harassment-free experience for
          everyone. We prioritize marginalized people’s safety over privileged
          people’s comfort. This includes taking seriously reasonable
          communication of boundaries. <br />
          <br />
          Harassment includes: Offensive comments related to gender, gender
          identity and expression, sexual orientation, disability, mental
          illness, neuro(a)typicality, physical appearance, age, race, or
          religion Unwelcome comments regarding a person’s lifestyle choices and
          practices, including those related to food, health, parenting, drugs,
          and employment Threats of violence Deliberate intimidation Stalking or
          following Sustained disruption of discussion Unwelcome sexual
          attention as well as patterns of inappropriate social contact
          Publication of non-harassing private communication Deliberate
          misgendering or use of ‘dead’ or rejected names
        </p>
      </div>
    </div>
  );
}

export default Homepage;
