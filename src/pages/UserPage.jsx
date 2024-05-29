import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserServices from "../context/UserServices";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CommunityCard from "../components/CommunityCard";
import CommunityServices from "../context/CommunityServices";
import { useColorScheme } from "../context/ColorSchemeServices";

const API_URL = "http://localhost:5005";

function UserPage() {
  const { currentScheme, setScheme } = useColorScheme();
  const { user, storeToken, authenticateUser, setUser, isLoggedIn } =
    useContext(AuthContext);
  console.log(user._id);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [userCreatedCommunities, setUserCreatedCommunities] = useState([]);
  const [userJoinedCommunities, setUserJoinedCommunities] = useState([]);

  useEffect(() => {
    console.log("Setting scheme to userpage");
    setScheme("userpage");
  }, [setScheme]);

  useEffect(() => {
    console.log("User effect running");
    if (isLoggedIn && user) {
      console.log("User is logged in:", user);
      setEmail(user.email);
      setName(user.name);
      setUserName(user.userName);
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  useEffect(() => {
    console.log("Fetching communities created by user:", user._id);
    CommunityServices.getCommunityByUserId(user._id)
      .then((resp) => {
        console.log(resp.data);
        setUserCreatedCommunities(resp.data);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, [user._id]);

  useEffect(() => {
    console.log("Fetching communities user is a member of:", user._id);
    CommunityServices.getCommunitiesUserIsMemberOf(user._id)
      .then((resp) => {
        console.log("Communities user is a member of:", resp.data);
        setUserJoinedCommunities(resp.data);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, [user._id]);

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} min-h-screen flex flex-col`}
    >
      <h1>{user.name}</h1>
      <Link to="./profile">
        <button>Edit Profile</button>
      </Link>
      <h1>Communities</h1>
      <Link to="./CommunityCreate">create</Link>
      <h2>created by </h2>
      <div>
        {userCreatedCommunities.map((community) => (
          <div key={community._id}>
            <h2>{community.name}</h2>
            <p>{community.description}</p>
          </div>
        ))}
        <br></br>
        <h2>Member of </h2>
        {userJoinedCommunities.map((community) => (
          <div key={community._id}>
            <h2>{community.name}</h2>
            <p>{community.description}</p>
            <br></br>
          </div>
        ))}
      </div>
      {/* <CommunityCard /> */}
      <h1>Events</h1>
      <Link to={`/users/${user.userName}/createEvent`}>create</Link>
      <h1>Tasks</h1>
    </div>
  );
}

export default UserPage;
