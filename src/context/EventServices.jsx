import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";
import { AuthContext } from "./auth.context";

const token = localStorage.getItem("authToken");

class EventServicesClass {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5005",
    });
  }
  getAllEvents() {
    return this.api.get("/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getEventById(id) {
    return this.api.get("api/events/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getEventCreatedByUserId(userId) {
    return this.api.get("/api/events/createdby/" + userId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getEventUserisAttending(userId) {
    return this.api.get("/api/events/createdby/" + userId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateEventById(eventId, reqBody) {
    return this.api.put("/events/" + eventId, reqBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createNewEvent(reqBody) {
    return this.api.post("/api/events", reqBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteEventById(id) {
    return this.api.delete("/events/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const EventServices = new EventServicesClass();
export default EventServices;
