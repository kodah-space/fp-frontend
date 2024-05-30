import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";
import { AuthContext } from "./auth.context";

const token = localStorage.getItem("authToken");

class UserServicesClass {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5005",
    });
  }

  getAllUsers() {
    return this.api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getUserById(userId) {
    return this.api.get("/users/" + userId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateUserById(userId, reqBody) {
    return this.api.put("/users/" + userId, reqBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createNewUser(reqBody) {
    return this.api.post("/users/", reqBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteUserById(id) {
    return this.api.delete("/users/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const UserServices = new UserServicesClass();
export default UserServices;
