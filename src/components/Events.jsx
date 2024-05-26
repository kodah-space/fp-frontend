import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import EventServices from "../context/EventServices";

export default function Events() {
  const [eventsCreatedByUser, setEventsCreatedByUser] = useState(null);
  const [eventsUserIsMemberOf, setEventsUserIsMemberOf] = useState(null);

  useEffect(() => {
    // Fetch events created by the user
    EventServices.getEventsCreatedByUser()
      .then((resp) => {
        setEventsCreatedByUser(resp.data);
      })
      .catch((error) =>
        console.error("Failed to fetch created events:", error)
      );

    // Fetch events the user is a member of
    EventServices.getEventsUserIsMemberOf()
      .then((resp) => {
        setEventsUserIsMemberOf(resp.data);
      })
      .catch((error) => console.error("Failed to fetch member events:", error));
  }, []);

  console.log("Events Created By User:", eventsCreatedByUser);
  console.log("Events User Is Member Of:", eventsUserIsMemberOf);

  if (!eventsCreatedByUser || !eventsUserIsMemberOf) return "loading...";

  return (
    <div>
      <h2>Events</h2>
      <div>
        {eventsCreatedByUser.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        {eventsUserIsMemberOf.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
