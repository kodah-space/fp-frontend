import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useColorScheme } from "../context/ColorSchemeServices";

export default function EventCard({ event }) {
  const { currentScheme } = useColorScheme();

  useEffect(() => {
    console.log("Current color scheme:", currentScheme);
  }, [currentScheme]);

  return (
    <div className="p-2">
      <Link to={`/events/${event._id}`}>
        <div
          className="relative border-2 border-solid w-36 h-36 overflow-hidden transform -skew-x-6"
          style={{ borderColor: currentScheme.text + " !important" }}
        >
          <div className="absolute inset-x-0 top-0 w-full h-1/2 z-10 overflow-hidden">
            <img
              src={event.eventImage}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)" }}
            />
          </div>
          <div
            className="absolute inset-x-0 top-1/2 w-full h-0 border-b-2 z-15 transform skew-x-6"
            style={{ borderColor: currentScheme.text + " !important" }}
          ></div>
          <div className="px-1 text-sm absolute inset-0 top-1/2 flex flex-col items-center justify-end pb-2 z-20 transform skew-x-6">
            <span className="text-inherit text-center font-[Unbounded-Regular] tracking-wide overflow-hidden line-clamp-2">
              {event.name}
            </span>
            <span className="text-inherit text-center font-[Unbounded-Regular] tracking-wide">
              {event.beginTime.substring(0, 10)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
