import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useColorScheme } from "../context/ColorSchemeServices";

const API_URL = "http://localhost:5005";

function ProfilePage() {
  const { currentScheme, setScheme } = useColorScheme();
  const { user, setUser, authenticateUser, isLoggedIn } =
    useContext(AuthContext);
  const [userName, setUserName] = useState(user.userName || "");
  const [email, setEmail] = useState(user.email || "");
  const [name, setName] = useState(user.name || "");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const token = localStorage.getItem("authToken");

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
    setScheme("userpage");
  }, [setScheme]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(undefined);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(undefined);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    const requestBody = { email, name, userName };

    axios
      .put(`${API_URL}/auth/update`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setSuccessMessage("Profile updated successfully!");
          console.log("success");
          // setUser(response.data.user); // Assuming the response contains the updated user details
          authenticateUser(); // Refresh the user data
        } else {
          console.log("Unexpected status code:", response.status);
          setErrorMessage(`Unexpected status code: ${response.status}`);
        }
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        console.log("error");
      });
  };

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} profile-form text-left h-screen flex flex-col  items-center`}
    >
      <form onSubmit={handleProfileUpdate}>
        <div>
          {user.profilePic && (
            <img
              src={user.profilePic}
              alt="Profile"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              className="mx-auto my-6"
            />
          )}
        </div>
        <label className="label">Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="input-field"
        />
        <br />
        <br />
        <label className="label">Email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="input-field"
        />
        <br />
        <br />
        <label className="label">User Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={userName}
          onChange={handleUserNameChange}
          className="input-field"
        />
        <br />
        <br />
        <div className="standard-btn">
          <button type="submit">▷ Update</button>
        </div>
      </form>
      {successMessage && (
        <p className="success-message text-green-500">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="error-message text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default ProfilePage;
