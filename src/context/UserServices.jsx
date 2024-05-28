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

  getUserById(userId) {
    return this.api.get("/users/" + userId);
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
}

const UserServices = new UserServicesClass();
export default UserServices;
