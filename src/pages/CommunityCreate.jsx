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

  const navigate = useNavigate();
  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleManifesto = (e) => setManifesto(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { name, description, creator, manifesto };
    axios
      .post(`${API_URL}/api/communities/`, requestBody)
      .then((response) => {
        navigate(`/communities/${response.data._id}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    setScheme("communitypage");
  }, [setScheme]);

  return (
    <div
      className={`${currentScheme.background} ${currentScheme.text} min-h-screen flex flex-col`}
    >
      <h2>Create a Community</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Community Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleName}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleDescription}
          />
        </div>
        <div>
          <label>Manifesto:</label>
          <textarea
            name="manifesto"
            value={manifesto}
            onChange={handleManifesto}
          />
        </div>
        <button type="submit">Create Community</button>
      </form>
    </div>
  );
}

export default CommunityCreate;
