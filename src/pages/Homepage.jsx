import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function Homepage() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold underline mb-4">HOMEPAGE</h1>
      <div className="flex justify-center">
        <div className="hexagon-container relative overflow-hidden">
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
        </div>
      </div>
    </div>
  );
}
export default Homepage;

<div className="flex">
  {" "}
  <div>
    {" "}
    <div className="w-[100px] h-[50px] relative">
      {" "}
      <div className="absolute top-[25px] border-l-[50px] border-r-[50px] border-b-[25px]"></div>{" "}
      <div className="bottom-[25px] border-l-[50px] border-r-[50px] border-b-[25px] border-l-transparent border-r-transparent"></div>{" "}
    </div>{" "}
    <div className="w-[100px] rotate-180 h-[50px] relative">
      {" "}
      <div className="absolute top-[25px] border-l-[50px] border-r-[50px] border-b-[25px]"></div>{" "}
      <div className="bottom-[25px] border-l-[50px] border-r-[50px] border-b-[25px] border-l-transparent border-r-transparent"></div>{" "}
    </div>{" "}
  </div>{" "}
</div>;
