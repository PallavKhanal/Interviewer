import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar.jsx";
import "../CSS/DashboardPage.css";

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleStartInterview = () => {
    navigate("/interview");
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Transforming Visa Interviews with AI</h1>
          <p>
            Practice real-time with our AI visa officer — trained on real F1 visa applicants,
            both successful and unsuccessful, to understand what truly makes an interview stand out.
          </p>
          <button className="cta-button" onClick={handleStartInterview}>
            🎤 Start Your Mock Interview
          </button>
        </div>
      </section>

      {/* Preview Section */}
      <section className="preview-section">
        <div className="laptop-frame">
          <div className="laptop-screen">
            {/* Video Call Simulation */}
            <div className="video-call-container">
              <div className="participant ai">
                <img
                  src="https://img.freepik.com/premium-photo/smiling-businessman-using-his-computer_13339-146882.jpg?w=360"
                  alt="AI Officer"
                  className="video-feed"
                />
                <p className="tag ai-tag">AI Officer</p>
              </div>

              <div className="participant user small-video">
                <img
                  src="https://media.istockphoto.com/id/1319095687/photo/head-shot-portrait-smiling-confident-man-looking-at-camera.jpg?s=170667a&w=0&k=20&c=eldz0urVxqbprsJdSzhi28qlbne_cu-2e4c9I5XzHUY="
                  alt="Applicant"
                  className="video-feed"
                />
                <p className="tag user-tag">You</p>
              </div>

              {/* Call Controls */}
              <div className="call-controls">
                <button className="control-btn mute" title="Mute">
                  🎙️
                </button>
                <button className="control-btn video" title="Toggle Camera">
                  📷
                </button>
                <button className="control-btn end" title="End Call">
                  🔴
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="credibility-section">
        <h2>Powered by Real Insights</h2>
        <p>
          Our AI model is trained using hundreds of real visa interview transcripts —
          both from successful F1 visa holders now studying in top U.S. universities,
          and from applicants who were denied.
        </p>
        <p>
          This dual dataset helps the AI understand not just <em>what to say</em>,
          but <em>how to say it</em> — enabling accurate tone, confidence, and intent scoring.
        </p>
      </section>

      <footer className="footer">
        <p>© 2025 VisaPrep — Empowering Students to Succeed</p>
      </footer>
    </div>
  );
}
