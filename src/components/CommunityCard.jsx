import React from "react";
import { useEffect, useState } from "react";
import userServices from "../context/UserServices";
import CommunityServices from "../context/CommunityServices";
import { Link } from "react-router-dom";

export default function CommunityCard({ community }) {
  return (
    <Link to={`/communities/${community.id}`}>
      <div>
        <h2>Community Card</h2>
      </div>
    </Link>
  );
}
