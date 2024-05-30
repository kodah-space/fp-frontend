import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";
import EventServices from "./EventServices";
import { AuthContext } from "./auth.context";

const token = localStorage.getItem("authToken");

class CommunityServicesClass {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5005",
    });
  }
  getAllCommunities() {
    return this.api.get("api/communities", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getCommunitytById(id) {
    return this.api.get("/api/communities/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getCommunityByUserId(creatorId) {
    return this.api.get("api/communities/createdby/" + creatorId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getCommunitiesUserIsMemberOf(userId) {
    return this.api.get("api/communities/joinedby/" + userId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateCommunityById(eventId, reqBody) {
    return this.api.put("/api/communities/" + eventId, reqBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createNewCommunity(reqBody) {
    return this.api.post("/Communities", reqBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteCommunityById(id) {
    return this.api.delete("/communities/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const CommunityServices = new CommunityServicesClass();
export default CommunityServices;
