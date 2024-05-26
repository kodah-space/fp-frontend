import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskServices from "../context/TaskServices";

export default function Tasks() {
  const [tasksConnectedToEvent, setTasksConnectedToEvent] = useState(null);
  const [tasksUserSignedupFor, setTasksUserSignedupFor] = useState(null);

  useEffect(() => {
    // Fetch tasks created for an event
    TaskServices.getTasksConnectedToEvent()
      .then((resp) => {
        setTasksConnectedToEvent(resp.data);
      })
      .catch((error) => console.error("Failed to fetch related tasks:", error));

    // Fetch tasks the user signedup for
    TaskServices.getTasksUserSignedupFor()
      .then((resp) => {
        setTasksUserSignedupFor(resp.data);
      })
      .catch((error) => console.error("Failed to fetch user tasks:", error));
  }, []);

  console.log("Tasks related to event:", tasksConnectedToEvent);
  console.log("Tasks User signedup for:", tasksUserSignedupFor);

  if (!tasksConnectedToEvent || !tasksUserSignedupFor) return "loading...";

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        {tasksConnectedToEvent.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasksUserSignedupFor.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
