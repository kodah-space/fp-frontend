import React from "react";
import { useEffect, useState } from "react";
import userServices from "../context/UserServices";
import CommunityServices from "../context/CommunityServices";
import { Link } from "react-router-dom";

export default function CommunityCard({ community }) {
  return (
    <div className="p-2">
      <Link to={`/communities/${community._id}`}>
        <div className="relative border-2 border-solid border-[#F3C83C] w-36 h-36 rounded-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 top-0 w-full h-1/2 z-10">
            <img
              src={community.communityImage}
              className="absolute inset-0 w-full h-full object-cover rounded-t-full"
            />
          </div>
          <div className="absolute inset-x-0 top-1/2 w-full h-0 border-b-2 border-[#F3C83C] z-15"></div>
          <div className="absolute bottom-3 w-full h-1/2 flex items-center justify-center z-20">
            <div className="px-1 text-sm text-center font-[Unbounded-Regular] tracking-wide overflow-hidden line-clamp-2">
              {community.name}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
