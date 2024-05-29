import React, { useState, useContext, useEffect } from "react";
import CommunityServices from "../context/CommunityServices";
import { useColorScheme } from "../context/ColorSchemeServices";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function CommunityPage() {
  const { currentScheme, setScheme } = useColorScheme();
  const { user, storeToken, authenticateUser, isLoggedIn } =
    useContext(AuthContext);

  const { communityId } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [communityImage, setCommunityImage] = useState("");
  const [description, setDescription] = useState("");
  const [manifesto, setManifesto] = useState("");
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    setScheme("communitypage");
  }, [setScheme]);

  useEffect(() => {
    console.log("User effect running");
    if (isLoggedIn && user) {
      console.log("User is logged in:", user);
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  useEffect(() => {
    console.log("Fetching community by Id", communityId);
    CommunityServices.getCommunitytById(communityId)
      .then((resp) => {
        console.log(resp.data);
        setName(resp.data.name);
        setCommunityImage(resp.data.communityImage);
        setDescription(resp.data.description);
        setManifesto(resp.data.manifesto);
        setMembers(resp.data.members);
        setEvents(resp.data.events);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, [user._id]);

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} min-h-screen flex flex-col`}
    >
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        {communityImage && (
          <img
            src={communityImage}
            alt={name}
            className="mb-4 w-full h-64 object-cover"
          />
        )}
        <p className="mb-4">{description}</p>
        <h2 className="text-2xl font-bold mb-2">Manifesto</h2>
        <p className="mb-4">{manifesto}</p>
        <h2 className="text-2xl font-bold mb-2">Members</h2>
        <ul className="list-disc list-inside mb-4">
          {members.map((member, index) => (
            <li key={index}>{member.name}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-bold mb-2">Events</h2>
        <ul className="list-disc list-inside mb-4">
          {events.map((event, index) => (
            <li key={index}>
              {event.name} - {new Date(event.beginTime).toLocaleDateString()}
            </li>
          ))}
        </ul>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default CommunityPage;
