import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AuthComponent.css";

export default function AuthComponent() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5001/api/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isSignup && password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const endpoint = isSignup ? "signup" : "login";

    try {
      const res = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong.");
        return;
      }

      // ✅ Store token and redirect
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="app-title">VisaPrep</h1>

      <div className="auth-card">
        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="input-group">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password (only for signup) */}
          {isSignup && (
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {/* Button */}
          <button type="submit" className="auth-button">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Message / error */}
        {message && <p className="message">{message}</p>}

        {/* Toggle */}
        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}
          <button
            className="toggle-button"
            onClick={() => {
              setIsSignup(!isSignup);
              setMessage("");
              setPassword("");
              setConfirmPassword("");
            }}
            type="button"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
