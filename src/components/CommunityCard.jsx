import React from "react";
import { useEffect, useState } from "react";
import userServices from "../context/UserServices";
import CommunityServices from "../context/CommunityServices";
import { Link } from "react-router-dom";

export default function CommunityCard({ community }) {
  return (
    <div className="p-2">
      <Link to={`/communities/${community._id}`}>
        <div className="relative border border-solid w-36 h-36 rounded-full overflow-hidden">
          <img
            src={community.imageUrl}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-inherit text-center font-[Unbounded-Regular] tracking-wide text-wrap">
              {community.name}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
