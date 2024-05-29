import React, { useState, useContext, useEffect } from "react";
import CommunityServices from "../context/CommunityServices";
import { useColorScheme } from "../context/ColorSchemeServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import EventServices from "../context/EventServices";

const API_URL = "http://localhost:5005";

function EventCreate() {
  const { currentScheme, setScheme } = useColorScheme();
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [location, setLocation] = useState("");
  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [typeOfEvent, setTypeOfEvent] = useState("");
  const [codeOfConduct, setCodeOfConduct] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [communities, setCommunities] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [eventTypes, setEventTypes] = useState([]);

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleEventImage = (e) => setEventImage(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
  const handleBeginTime = (e) => setBeginTime(e.target.value);
  const handleEndTime = (e) => setEndTime(e.target.value);
  const handleTypeOfEvent = (e) => setTypeOfEvent(e.target.value);
  const handleCodeOfConduct = (e) => setCodeOfConduct(e.target.value);
  const handleCommunityId = (e) => setCommunityId(e.target.value);

  // useEffect(() => {
  //   setScheme("eventpage");
  // }, [setScheme]);

  useEffect(() => {
    axios;
    CommunityServices.getCommunitiesUserIsMemberOf(user._id)
      .then((response) => {
        setCommunities(response.data);
        console.log(communities);
      })
      .catch((error) => {
        console.error("Error fetching communities", error);
      });
    setScheme("eventpage");
  }, [setScheme]);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/event-types`);
        setEventTypes(response.data);
      } catch (error) {
        console.error("Error fetching event types", error);
      }
    };

    fetchEventTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      description,
      eventImage,
      location,
      beginTime,
      endTime,
      typeOfEvent,
      codeOfConduct,
      creator: user._id,
      communityId,
    };

    axios
      .post(`${API_URL}/api/events`, requestBody)
      .then((response) => {
        navigate(`/communities/${response.data._id}`);
        console.log(response);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} min-h-screen flex flex-col`}
    >
      <h2>Create an Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Community:</label>
          <select value={communityId} onChange={handleCommunityId} required>
            <option value="">Select a community</option>
            {communities.map((community) => (
              <option key={community._id} value={community._id}>
                {community.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Event Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleName}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleDescription}
            required
          />
        </div>

        <div>
          <label>Event Image URL:</label>
          <input
            type="text"
            name="eventImage"
            value={eventImage}
            onChange={handleEventImage}
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleLocation}
            required
          />
        </div>

        <div>
          <label>Begin Time:</label>
          <input
            type="datetime-local"
            name="beginTime"
            value={beginTime}
            onChange={handleBeginTime}
            required
          />
        </div>

        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            name="endTime"
            value={endTime}
            onChange={handleEndTime}
            required
          />
        </div>

        <div>
          <label>Type of Event:</label>
          <select value={typeOfEvent} onChange={handleTypeOfEvent} required>
            <option value="">Select the event type</option>
            {eventTypes.map((event, key) => (
              <option key={key} value={event.id}>
                {event}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Code of Conduct:</label>
          <textarea
            name="codeOfConduct"
            value={codeOfConduct}
            onChange={handleCodeOfConduct}
          />
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventCreate;
