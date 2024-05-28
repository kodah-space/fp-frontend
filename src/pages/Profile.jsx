import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function ProfilePage() {
  const { user, storeToken, authenticateUser, isLoggedIn } =
    useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  console.log(user);

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleUserNameChange = (e) => setUserName(e.target.value);

  const validateInputs = () => {
    if (!userName || !email || !name) {
      setErrorMessage("No fields can be empty");
      return false;
    }

    const userNameRegex = /^[a-zA-Z0-9]{5,25}$/;
    if (!userNameRegex.test(userName)) {
      setErrorMessage("Provide a valid User ID.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Provide a valid email address.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      setEmail(user.email);
      setName(user.name);
      setUserName(user.userName);
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    const requestBody = { email, name, userName };

    axios
      .put(`${API_URL}/auth/update`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        // Assuming the response contains the updated user details
        // storeToken(response.data.authToken); // If a new token is provided
        // console.log(response.data.authToken);
        authenticateUser(); // Refresh the user data
        setEmail(response.data.user.email);
        setName(response.data.user.name);
        setUserName(response.data.user.userName);
        // console.log(response.data.user);
        // setUser(response.data.user);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="ProfilePage">
      <h1>Profile</h1>

      <form onSubmit={handleProfileUpdate}>
        {user.profilePic && (
          <img
            src={user.profilePic}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        )}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />

        <br />
        <label>User Name:</label>
        <input
          type="text"
          name="name"
          value={userName}
          onChange={handleUserNameChange}
        />
        <br />
        <button type="submit">Update</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ProfilePage;
