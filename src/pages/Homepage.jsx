import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function Homepage() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">HOMEPAGE</h1>
      <img className="mask mask-hexagon" src="https://picsum.photos/536/354" />
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
            <img src="https://picsum.photos/536/354" />
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
}

export default Homepage;
