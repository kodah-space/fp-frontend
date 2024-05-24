import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

class UserServicesClass {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5005",
    });
  }

  getAllUsers() {
    return this.api.get("/users");
  }

  getUserById(id) {
    return this.api.get("/users/" + id);
  }

  updateUserById(userId, reqBody) {
    return this.api.put("/users/" + userId, reqBody);
  }

  createNewUser(reqBody) {
    return this.api.post("/users/", reqBody);
  }

  deleteUserById(id) {
    return this.api.delete("/users/" + id);
  }

  // need to add functions that get, put communitiies and events??
}

const UserServices = new UserServicesClass();
export default UserServices;
