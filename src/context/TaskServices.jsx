import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";
import UserServices from "./UserServices";

class TaskServicesClass {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5005",
    });
  }

  getTaskById(id) {
    return this.api.get("/tasks/" + id);
  }

  getTaskByUserId(userId) {
    return this.api.get("/tasks?userId=" + userId);
  }
  //signup of users for tasks
  updateTaskById(taskId, reqBody) {
    return this.api.put("/tasks/" + taskId, reqBody);
  }

  createNewTask(reqBody) {
    return this.api.post("/tasks", reqBody);
  }

  deleteTaskById(id) {
    return this.api.delete("/tasks/" + id);
  }

  getTaskContributedByUserId(userId) {
    return this.api.get("/api/tasks/contibutionby/" + userId);
  }
}

const TaskServices = new TaskServicesClass();
export default TaskServices;
