import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useColorScheme } from "../context/ColorSchemeServices";

const API_URL = "http://localhost:5005";

function LoginPage(props) {
  const { currentScheme, setScheme } = useColorScheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Store the JWT token
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);

        // Authenticate the user
        authenticateUser();

        // Navigate to the user-specific page

        navigate(`/users/${response.data.user.userName}`);
      })
      .catch((error) => {
        console.log("errorLogin", error);
        // const errorDescription = error.response.data.message;
        // setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    setScheme("authpage");
  }, [setScheme]);

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} text-left min-h-screen flex flex-col  items-center`}
    >
      <div className="w-full text-left px-4">
        <h2>Login</h2>
      </div>

      <br />

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <br />
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <br />
        <br />
        <div className="text-center">
          <button type="submit">▷ Login</button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <br />
      <p>Don't have an account yet?</p>
      <div className="text-center">
        <Link to={"/signup"}>▷ Sign Up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
