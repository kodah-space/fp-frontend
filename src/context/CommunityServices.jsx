import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";
import EventServices from "./EventServices";

class CommunityServicesClass {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5005",
    });
  }
  getAllCommunities() {
    return this.api.get("/communities");
  }

  getCommunitytById(id) {
    return this.api.get("/community/" + id);
  }

  getCommunityByUserId(creatorId) {
    return this.api.get("api/communities/createdby/" + creatorId);
  }

  getCommunitiesUserIsMemberOf(userId) {
    return this.api.get("api/communities/joinedby/" + userId);
  }

  updateCommunityById(eventId, reqBody) {
    return this.api.put("/communities/" + eventId, reqBody);
  }

  createNewCommunity(reqBody) {
    return this.api.post("/Communities", reqBody);
  }

  deleteCommunityById(id) {
    return this.api.delete("/communities/" + id);
  }
}

const CommunityServices = new CommunityServicesClass();
export default CommunityServices;
