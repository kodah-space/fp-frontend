import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useColorScheme } from "../context/ColorSchemeServices";

const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const { currentScheme, setScheme } = useColorScheme();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handleUserName = (e) => setUserName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleDateOfBirth = (e) => setDateOfBirth(e.target.value);

  const validateInputs = () => {
    if (!userName || !email || !password || !name || !dateOfBirth) {
      setErrorMessage("All fields are required.");
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

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter."
      );
      return false;
    }

    const dateOfBirthRegex =
      /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!dateOfBirthRegex.test(dateOfBirth)) {
      setErrorMessage("Provide a valid date of birth (YYYY-MM-DD).");
      return false;
    }

    useEffect(() => {
      setScheme("authpage");
    }, [setScheme]);

    return true;
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    // Create an object representing the request body
    const requestBody = { email, password, name, userName, dateOfBirth };
    console.log(requestBody);

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  // Get today's date in the format YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} text-left min-h-screen flex flex-col items-center`}
    >
      <div className="w-full text-left px-4">
        <h2>Sign Up</h2>
      </div>
      <br />

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          className="input-field"
        />
        <br />
        <br />
        <label>User Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={userName}
          onChange={handleUserName}
          className="input-field"
        />
        <br />
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          className="input-field"
        />
        <br />
        <br />
        <label>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          className="input-field"
        />
        <br />
        <br />
        <label>Date of Birth:</label>
        <br />
        <input
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={handleDateOfBirth}
          max={getTodayDate()}
          className="input-field"
        />
        <br />
        <br />
        <div className="standard-btn">
          <button type="submit">▷ Sign Up</button>
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <br />
      <div className="standard-btn pb-24">
        <p>Already have account?</p>
        <Link to={"/login"}>▷ Login</Link>
      </div>
    </div>
  );
}

export default SignupPage;
