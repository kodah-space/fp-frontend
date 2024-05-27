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
            <g clipPath="url(#clip)">
              <foreignObject x="0" y="58px" width="100" height="57.74">
                <div className="bg-white w-full h-full flex items-center justify-center p-4">
                  <p>Text content goes here</p>
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
export default Homepage;
