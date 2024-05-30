import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useColorScheme } from "../context/ColorSchemeServices";

const API_URL = "http://localhost:5005";

function CommunityCreate() {
  const { currentScheme, setScheme } = useColorScheme();
  const { user, storeToken, authenticateUser, isLoggedIn } =
    useContext(AuthContext);

  console.log(user);
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     description: "",
  //     manifesto: "",
  //     creator: user._id, // This should be dynamically set based on logged-in user
  //   });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [manifesto, setManifesto] = useState("");
  const [creator, setCreator] = useState(user._id);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleManifesto = (e) => setManifesto(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { name, description, creator, manifesto };
    axios
      .post(`${API_URL}/api/communities/`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate(`/communities/${response.data._id}`);
        console.log("done");
      })
      .catch((error) => {
        if (error.response) {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        } else if (error.request) {
          setErrorMessage("Network error. Please try again.");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      });
  };

  useEffect(() => {
    setScheme("communitypage");
  }, [setScheme]);

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} text-left min-h-screen `}
    >
      <h2 className="px-5 pb-5">Create New Community</h2>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Community Name:</label>
            <br />
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleName}
              required
              className="input-field"
            />
          </div>
          <br />
          <div>
            <label>Description:</label> <br />
            <textarea
              name="description"
              value={description}
              onChange={handleDescription}
              className="input-field"
            />
          </div>
          <br />
          <div>
            <label>Manifesto:</label> <br />
            <textarea
              name="manifesto"
              value={manifesto}
              onChange={handleManifesto}
              className="input-field"
            />
          </div>
          <br />
          <div className="standard-btn text-center">
            <button type="submit">▷ Create Community</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommunityCreate;
