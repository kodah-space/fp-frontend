import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserServices from "../context/UserServices";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CommunityCard from "../components/CommunityCard";

const API_URL = "http://localhost:5005";

function UserPage() {
  const { user, storeToken, authenticateUser, setUser, isLoggedIn } =
    useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && user) {
      setEmail(user.email);
      setName(user.name);
      setUserName(user.userName);
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  return (
    <div>
      <h1>{user.name}</h1>
      <Link to="../profile/:userName">
        <button>Edit Profile</button>
      </Link>
      <h1>Communities</h1>
      <Link to="../CommunityCreate">create</Link>
      {/* <CommunityCard /> */}
      <h1>Events</h1>
      <Link to="../EventCreate">create</Link>
      <h1>Tasks</h1>
    </div>
  );
}

export default UserPage;
