import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthComponent from "./Components/AuthComponent.jsx";
import "./App.css";
import LoginPage from "./Pages/LoginPage.jsx";
import DashboardPage from "./Pages/DashboardPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoutes.jsx";
import InterviewPage from "./Pages/InterviewPage.jsx";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/interview" element={<ProtectedRoute><InterviewPage /></ProtectedRoute>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
