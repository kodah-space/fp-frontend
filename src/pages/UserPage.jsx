import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import UserServices from "../context/UserServices";

const API_URL = "http://localhost:5005";

function UserPage() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  console.log("UserPage component rendering");

  useEffect(() => {
    console.log("Fetching user data for user ID:", userId);
    UserServices.getUserById(userId)
      .then((resp) => {
        console.log("User data fetched:", resp.data);
        setUserData(resp.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }

  return (
    <div>
      <h1>USER PAGE</h1>
      <h1>{userData.name}</h1>
      <p>Email: {userData.email}</p>
      {/* Add more user details as needed */}
    </div>
  );
}

export default UserPage;
