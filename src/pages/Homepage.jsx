import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useColorScheme } from "../context/ColorSchemeServices";
import { useEffect } from "react";

const API_URL = "http://localhost:5005";

function Homepage() {
  const { currentScheme } = useColorScheme();

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} flex flex-col min-h-screen`}
    >
      <span className="text-2xl font-bold underline py-5">
        Join kandi & make things happen
      </span>
      <p className="px-4">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren.
      </p>
      <br />
      <Link to="/login" className="no-underline hover:underline pb-4">
        ▷ Sign Up
      </Link>
      <div className="border-2 mx-5 mt-5 mb-20 border-[#E2DD68] text-left">
        <h3 className="font-bold text-xl underline p-4">Community Rules</h3>
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

{
  /* <div className="hexagon-container relative overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 115.47"
          >
            <clipPath id="clip">
              <polygon points="50,10 100,27 100,88 50,105 0,88 0,27"></polygon>
            </clipPath>
            <image
              href="https://picsum.photos/536/354"
              x="0"
              y="0"
              height="58px"
              width="100"
              clipPath="url(#clip)"
            />
          </svg>
          <svg>
            <clipPath id="clip2">
              <polygon points="5% 5%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%"></polygon>
            </clipPath>
            <div className="hexagon-container bg-white">
              <p height="58px" width="100" clipPath="url(#clip2)">
                Text content goes here
              </p>
            </div>
          </svg>
        </div> */
}
