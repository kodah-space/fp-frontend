import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage(props) {
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
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <br />
        <label>User Name:</label>
        <input
          type="text"
          name="name"
          value={userName}
          onChange={handleUserName}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <br />
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />
        <br />
        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={handleDateOfBirth}
          max={getTodayDate()}
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
