import React from "react";
import { useEffect, useState } from "react";
import TaskServices from "../context/TaskServices";
import { Link } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";

import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="relative inline-block">
      <div className="hexagon"></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <h2 className="text-white text-lg">{task.title}</h2>
      </div>
    </div>
  );
};

export default TaskCard;
