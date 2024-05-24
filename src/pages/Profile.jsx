import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function ProfilePage() {
  const { user, storeToken, authenticateUser, isLoggedIn } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && user) {
      setEmail(user.email);
      setName(user.name);
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    const requestBody = { email, name };

    axios
      .put(`${API_URL}/auth/update`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        // Assuming the response contains the updated user details
        storeToken(response.data.authToken); // If a new token is provided
        authenticateUser(); // Refresh the user data
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
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <button type="submit">Update</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ProfilePage;
