import React, { useState, useContext, useEffect } from "react";
import CommunityServices from "../context/CommunityServices";
import { useColorScheme } from "../context/ColorSchemeServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import EventServices from "../context/EventServices";
const token = localStorage.getItem("authToken");

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

  const navigate = useNavigate();

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
      .post(`${API_URL}/api/events/`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate(`/events/${response.data._id}`);
        console.log(response.data);
        console.log("done");
      })
      .catch((error) => {
        if (error.response) {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        } else if (error.request) {
          setErrorMessage("Network error. Please try again.");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      });
  };

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} text-left min-h-screen `}
    >
      <h2 className="px-5 pb-5">Create an Event</h2>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Community:</label>
            <br />
            <select
              value={communityId}
              onChange={handleCommunityId}
              required
              className="input-field"
            >
              <option value="">Select a community</option>
              {communities.map((community) => (
                <option key={community._id} value={community._id}>
                  {community.name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div>
            <label>Event Name:</label>
            <br />
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleName}
              required
              className="input-field"
            />
          </div>
          <br />

          <div>
            <label>Description:</label>
            <br />
            <textarea
              name="description"
              value={description}
              onChange={handleDescription}
              required
              className="input-field"
            />
          </div>
          <br />

          <div>
            <label>Event Image URL:</label>
            <br />
            <input
              type="text"
              name="eventImage"
              value={eventImage}
              onChange={handleEventImage}
              className="input-field"
            />
          </div>
          <br />

          <div>
            <label>Location:</label>
            <br />
            <input
              type="text"
              name="location"
              value={location}
              onChange={handleLocation}
              required
              className="input-field"
            />
          </div>
          <br />

          <div>
            <label>Begin Time:</label>
            <br />
            <input
              type="datetime-local"
              name="beginTime"
              value={beginTime}
              onChange={handleBeginTime}
              required
              className="input-field"
            />
          </div>
          <br />
          <div>
            <label>End Time:</label>
            <br />
            <input
              type="datetime-local"
              name="endTime"
              value={endTime}
              onChange={handleEndTime}
              required
              className="input-field"
            />
          </div>
          <br />
          <div>
            <label>Type of Event:</label>
            <br />
            <select
              value={typeOfEvent}
              onChange={handleTypeOfEvent}
              required
              className="input-field"
            >
              <option value="">Select the event type</option>
              {eventTypes.map((event, key) => (
                <option key={key} value={event.id}>
                  {event}
                </option>
              ))}
            </select>
          </div>
          <br />

          <div>
            <label>Code of Conduct:</label>
            <br />
            <textarea
              name="codeOfConduct"
              value={codeOfConduct}
              onChange={handleCodeOfConduct}
              className="input-field"
            />
          </div>
          <br />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <div className="standard-btn">
            <button type="submit">▷ Create Event</button>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
}

export default EventCreate;
