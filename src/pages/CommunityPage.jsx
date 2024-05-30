import React, { useState, useContext, useEffect } from "react";
import CommunityServices from "../context/CommunityServices";
import { useColorScheme } from "../context/ColorSchemeServices";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import EventCard from "../components/EventCard";

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
      <div className="community-container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{name}</h1>
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

        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-2">Events</h2>
          <div className="list-disc list-inside mb-4 flex flex-wrap justify-center">
            {events.map((event, index) => (
              <div key={event._id}>
                <EventCard key={event._id} event={event} />
              </div>
            ))}
          </div>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
        <div className="flex flex-col pb-20">
          <h2 className="text-2xl font-bold mb-2">Members</h2>
          <ul className="list-none list-inside mb-4 flex flex-wrap justify-center">
            {members.map((member, index) => (
              <li
                key={member._id}
                className="mr-4 flex items-center flex-col p-2"
              >
                <img
                  src={member.profilePic}
                  alt={member.name}
                  className="w-16 h-16 rounded-full mr-2 object-cover p-1"
                />
                <span>{member.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
