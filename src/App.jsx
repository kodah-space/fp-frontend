import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import IsPrivate from "./components/IsPrivate"; // <== IMPORT
import IsAnon from "./components/IsAnon"; // <== IMPORT
import Profile from "./pages/Profile";
import Imprint from "./pages/Imprint";
import UserPage from "./pages/UserPage";
import Homepage from "./pages/Homepage";
import CommunityCreate from "./pages/CommunityCreate";
import { ColorSchemeProvider } from "./context/ColorSchemeServices";
import CommunityPage from "./pages/CommunityPage";

function App() {
  return (
    <ColorSchemeProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/signup"
            element={
              <IsAnon>
                <SignupPage />
              </IsAnon>
            }
          />
          <Route
            path="/users/:userName/profile"
            element={
              <IsPrivate>
                <Profile />
              </IsPrivate>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <LoginPage />
              </IsAnon>
            }
          />
          <Route
            path="/users/:userName"
            element={
              <IsPrivate>
                <UserPage />
              </IsPrivate>
            }
          />
          <Route
            path="/users/:userName/CommunityCreate"
            element={
              <IsPrivate>
                <CommunityCreate />
              </IsPrivate>
            }
          />

          <Route
            path="/communities/:id"
            element={
              <IsPrivate>
                <CommunityPage />
              </IsPrivate>
            }
          />
          <Route path="/imprint" element={<Imprint />} />
        </Routes>
        <Footer />
      </div>
    </ColorSchemeProvider>
  );
}

export default App;
