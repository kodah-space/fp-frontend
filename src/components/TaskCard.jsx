import React from "react";
import { useEffect, useState } from "react";
import TaskServices from "../context/TaskServices";
import { Link } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";

export default function TaskCard({ task }) {
  return (
    <div className="p-2">
      <Link to={`/communities/${task.id}`}>
        <div className="relative border border-solid w-36 h-36 rounded-full overflow-hidden">
          <img
            src={task.imageUrl}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-inherit text-center font-[Unbounded-Regular] tracking-wide text-wrap">
              {task.name}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
