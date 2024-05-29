import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserServices from "../context/UserServices";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CommunityCard from "../components/CommunityCard";
import CommunityServices from "../context/CommunityServices";
import EventServices from "../context/EventServices";
import { useColorScheme } from "../context/ColorSchemeServices";
import EventCard from "../components/EventCard";
import Imprint from "./Imprint";

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
  const [userCreatedEvents, setUserCreatedEvents] = useState([]);
  const [userJoinedEvents, setUserJoinedEvents] = useState([]);

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

  useEffect(() => {
    console.log("Fetching events created by user:", user._id);
    EventServices.getEventCreatedByUserId(user._id)
      .then((resp) => {
        console.log("Events user created", resp.data);
        setUserCreatedEvents(resp.data);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, [user._id]);

  useEffect(() => {
    console.log("Fetching events attending by user:", user._id);
    EventServices.getEventUserisAttending(user._id)
      .then((resp) => {
        console.log("Events user is a Attending", resp.data);
        setUserJoinedEvents(resp.data);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, [user._id]);

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} min-h-screen flex flex-col`}
    >
      <Link to="./profile" className="text-end text-sm pr-4 pt-2">
        <button>▷ Edit Profile</button>
      </Link>
      <h2>Communities</h2>
      <Link to="./CommunityCreate" className="create-btn">
        ▷ create
      </Link>
      <div className="flex flex-row">
        {userCreatedCommunities.map((community) => (
          <div key={community._id}>
            <CommunityCard key={community._id} community={community} />
          </div>
        ))}
        {userJoinedCommunities.map((community) => (
          <div key={community._id}>
            <CommunityCard key={community._id} community={community} />
          </div>
        ))}
      </div>
      {/* <CommunityCard /> */}
      <h2>Events</h2>
      <Link to="./createEvent" className="create-btn">
        ▷ create
      </Link>
      <div className="flex flex-row">
        {userCreatedEvents.map((event) => (
          <div key={event._id}>
            <EventCard key={event._id} event={event} />
          </div>
        ))}
        {userJoinedEvents.map((event) => (
          <div key={event._id}>
            <EventCard key={event._id} event={event} />
          </div>
        ))}
      </div>
      <h2>Events</h2>
    </div>
  );
}

export default UserPage;
