import React from "react";
import { useEffect, useState } from "react";
import EventServices from "../context/EventServices";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="p-2">
      <Link to={`/communities/${event.id}`}>
        <div className="relative border border-solid w-36 h-36 overflow-hidden">
          <img
            src={event.imageUrl}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-inherit text-center font-[Unbounded-Regular] tracking-wide text-wrap">
              {event.name}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
