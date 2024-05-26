import React from "react";
import { useEffect, useState } from "react";
import TaskServices from "../context/TaskServices";
import { Link } from "react-router-dom";

export default function CommunityCard({ task }) {
  return (
    <Link to={`/tasks/${task.id}`}>
      <div>
        <h2>Task Card</h2>
      </div>
    </Link>
  );
}
