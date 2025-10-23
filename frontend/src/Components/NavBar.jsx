import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left" onClick={() => navigate("/dashboard")}>
        <h2 className="nav-logo">VisaPrep<span>.</span></h2>
      </div>

      <div className="nav-links">
        <button onClick={() => navigate("/dashboard")} className="nav-link">Home</button>
        <button onClick={() => navigate("/profile")} className="nav-link">Profile</button>
        <button onClick={() => navigate("/interview")} className="start-btn">🎤 Start Interview</button>
      </div>
    </nav>
  );
}
