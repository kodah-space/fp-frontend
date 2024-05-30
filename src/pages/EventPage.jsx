import React, { useState, useContext, useEffect } from "react";
import EventServices from "../context/EventServices";
import { useColorScheme } from "../context/ColorSchemeServices";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard";

function EventPage() {
  const { currentScheme, setScheme } = useColorScheme();
  const { user, storeToken, authenticateUser, isLoggedIn } =
    useContext(AuthContext);

  const { eventId } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [typeOfEvent, setTypeOfEvent] = useState("");
  const [description, setDescription] = useState("");
  const [codeOfConduct, setCodeOfConduct] = useState("");
  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [creator, setCreator] = useState("");
  const [location, setLocation] = useState("");
  const [attendees, setAttendees] = useState("");
  const [taskLists, setTaskLists] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    setScheme("eventpage");
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
    console.log("Fetching event by Id", eventId);
    EventServices.getEventById(eventId)
      .then((resp) => {
        console.log(resp.data);
        setName(resp.data.name);
        setEventImage(resp.data.eventImage);
        setDescription(resp.data.description);
        setTypeOfEvent(resp.data.typeOfEvent);
        setCodeOfConduct(resp.data.codeOfConduct);
        setBeginTime(resp.data.beginTime);

        setEndTime(resp.data.endTime);
        setCreator(resp.data.creator);
        setLocation(resp.data.location);
        setAttendees(resp.data.attendees);
        setTaskLists(resp.data.taskLists);
        setCheckList(resp.data.checkList);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, [user._id]);

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} min-h-screen flex flex-col`}
    >
      <h1 className="text-3xl font-bold my-4">{name}</h1>
      <p className="pb-5">{typeOfEvent}</p>
      {eventImage && (
        <img src={eventImage} alt={name} className="w-full max-w-lg mx-auto" />
      )}
      <div className="px-4 py-2">
        <p className="pt-3 pb-5">{description}</p>
        <div
          className="relative flex-col border border-solid overflow-hidden flex items-center justify-center p-5 mb-5"
          style={{ borderColor: "var(--border-color)" }}
        >
          <p>
            <span>Begin Time:</span> {new Date(beginTime).toLocaleString()}
          </p>
          <p>
            <span>End Time:</span> {new Date(endTime).toLocaleString()}
          </p>
          {/* <p>
          <strong>Creator:</strong> {creator.name || "N/A"}
        </p> */}
          <p>
            <span>Location:</span> {location || "N/A"}
          </p>
          <p>
            <span>Attendees:</span> {attendees.length || 0}
          </p>
        </div>
        <h2>Code of Conduct</h2>
        <p className="text-left">{codeOfConduct}</p>
        <div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Task List</h2>
          <div className="flex flex-row flex-wrap justify-center">
            {taskLists.map((task, index) => (
              <TaskCard key={index} task={task} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mt-4 mb-20">Check List</h2>
          <ul>
            {checkList.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
