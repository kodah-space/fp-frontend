import React from "react";
import { useEffect, useState } from "react";
import userServices from "../context/UserServices";
import EventServices from "../context/EventServices";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <Link to={`/communities/${event.id}`}>
      <div>
        <h2>Event Card</h2>
      </div>
    </Link>
  );
}
