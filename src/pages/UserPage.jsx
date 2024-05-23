import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context"; // <== IMPORT

function UserPage() {
  const {
    isLoggedIn,
    user, // <== UPDATE
    logOutUser,
  } = useContext(AuthContext);

  return <span>TEST</span>;
}
export default UserPage;
