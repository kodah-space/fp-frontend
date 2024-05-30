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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

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
        setUserName(response.data.user.userName);
        // Assuming the response contains the updated user details
        // storeToken(response.data.authToken); // If a new token is provided
        // console.log(response.data.authToken);
        // setUser(response.data.user); // Update user state in context
        authenticateUser(); // Refresh the user data
        // console.log(response.data.user);
        // setUser(response.data.user);
      })
      .catch((error) => {
        console.log("err", error);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
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
          className="px-2 mb-2"
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
          className="px-2 mb-2"
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
          className="px-2 mb-2"
        />
        <br />
        <br />
        <div className="standard-btn">
          <button type="submit">▷ Update</button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ProfilePage;
