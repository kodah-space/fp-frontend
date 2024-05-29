import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

class EventServicesClass {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5005",
    });
  }
  getAllEvents() {
    return this.api.get("/events");
  }

  getEventById(id) {
    return this.api.get("/events/" + id);
  }

  getEventByUserId(userId) {
    return this.api.get("/events?userId=" + userId);
  }

  updateEventById(eventId, reqBody) {
    return this.api.put("/events/" + eventId, reqBody);
  }

  createNewEvent(reqBody) {
    return this.api.post("/api/events", reqBody);
  }

  deleteEventById(id) {
    return this.api.delete("/events/" + id);
  }
}

const EventServices = new EventServicesClass();
export default EventServices;
