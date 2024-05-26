import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";
import UserServices from "./UserServices";

class CheckItemServicesClass {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5005",
    });
  }

  getCheckItemById(id) {
    return this.api.get("/checkitems/" + id);
  }

  getCheckItemByUserId(userId) {
    return this.api.get("/checkitems?userId=" + userId);
  }
  //check status of item, true or false
  updateCheckItemById(checkitemId, reqBody) {
    return this.api.put("/checkitems/" + checkitemId, reqBody);
  }

  createNewCheckItem(reqBody) {
    return this.api.post("/checkitems", reqBody);
  }

  deleteCheckItemById(id) {
    return this.api.delete("/checkitems/" + id);
  }
}

const CheckItemServices = new CheckItemServicesClass();
export default CheckItemServices;
