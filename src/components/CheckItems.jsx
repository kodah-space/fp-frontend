import CheckItemServices from "../context/CheckItemServices";
import CheckItemCard from "./CheckItemCard";

export default function CheckItems() {
  const [checkitemsConnectedToEvent, setCheckitemsConnectedToEvent] =
    useState(null);
  const [checkitemsUserStatus, setCheckitemsUserStatus] = useState(null);

  useEffect(() => {
    // Fetch check items created for an event
    CheckItemServices.getCheckitemsConnectedToEvent()
      .then((resp) => {
        setCheckitemsConnectedToEvent(resp.data);
      })
      .catch((error) =>
        console.error("Failed to fetch related check items:", error)
      );

    // Fetch check items and get status (true, false)
    CheckItemServices.getCheckitemsUserStatus()
      .then((resp) => {
        setCheckitemsUserStatus(resp.data);
      })
      .catch((error) =>
        console.error("Failed to fetch status of check items:", error)
      );
  }, []);

  console.log("Check items related to event:", checkitemsConnectedToEvent);
  console.log("Check items' status:", checkitemsUserStatus);

  if (!checkitemsConnectedToEvent || !checkitemsUserStatus) return "loading...";

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        {checkitemsConnectedToEvent.map((task) => (
          <CheckItemCard key={task.id} task={task} />
        ))}
        {checkitemsUserStatus.map((task) => (
          <CheckItemCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
