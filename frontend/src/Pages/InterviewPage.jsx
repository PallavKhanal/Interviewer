import React, { useRef, useState, useEffect } from "react";
import "../CSS/InterviewPage.css";

export default function InterviewPage() {
  const videoRef = useRef(null);
  const [previewStream, setPreviewStream] = useState(null);
  const [interviewStream, setInterviewStream] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [stage, setStage] = useState("permission"); // "permission" → "ready" → "interview"

  // Attach the correct stream to the video element whenever it updates
  useEffect(() => {
    const currentStream = interviewStream || previewStream;
    if (videoRef.current && currentStream) {
      videoRef.current.srcObject = currentStream;
    }
  }, [previewStream, interviewStream]);

  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true,
      });
      setPreviewStream(stream);
      setStage("ready");
    } catch (err) {
      alert("Camera access is required to proceed.");
      console.error(err);
    }
  };

  const handleBeginInterview = async () => {
    await requestFullscreen();
    stopPreview();
    await startInterviewCamera();
    setStage("interview");
  };

  const startInterviewCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true,
      });
      setInterviewStream(stream);
    } catch (error) {
      console.error("Error starting interview:", error);
    }
  };

  const stopPreview = () => {
    if (previewStream) previewStream.getTracks().forEach((t) => t.stop());
    setPreviewStream(null);
  };

  const stopInterview = () => {
    if (interviewStream) interviewStream.getTracks().forEach((t) => t.stop());
    setInterviewStream(null);
    exitFullscreen();
  };

  const toggleVideo = () => {
    const stream = interviewStream || previewStream;
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setIsVideoOn(videoTrack.enabled);
  };

  const toggleMute = () => {
    const stream = interviewStream || previewStream;
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setIsMuted(!audioTrack.enabled);
  };

  const endCall = () => {
    stopInterview();
    window.location.href = "/dashboard";
  };

  // ---------- Fullscreen ----------
  const requestFullscreen = async () => {
    const element = document.documentElement;
    try {
      if (element.requestFullscreen) await element.requestFullscreen();
      else if (element.webkitRequestFullscreen) await element.webkitRequestFullscreen();
      else if (element.msRequestFullscreen) await element.msRequestFullscreen();
    } catch (err) {
      console.warn("Fullscreen not supported.");
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
      else if (document.msExitFullscreen) await document.msExitFullscreen();
    } catch (err) {
      console.warn("Failed to exit fullscreen.");
    }
  };

  return (
    <div className="interview-page">
      {stage === "permission" && (
        <div className="pre-interview-screen">
          <div className="ready-card">
            <h1>Before We Begin</h1>
            <p>Please allow access to your camera and microphone to continue.</p>
            <button className="begin-btn" onClick={handleCameraAccess}>
              🎥 Turn On Camera
            </button>
          </div>
        </div>
      )}

      {stage === "ready" && (
        <div className="pre-interview-screen">
          <div className="ready-card">
            <h1>Camera Preview</h1>
            {/* ✅ Always keep playsInline and autoPlay */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="preview-video"
            />
            <p>Make sure your face is clearly visible and lighting is good.</p>
            <button className="begin-btn" onClick={handleBeginInterview}>
              🎤 Begin Interview
            </button>
          </div>
        </div>
      )}

      {stage === "interview" && (
        <div className="interview-fullscreen">
          <div className="interview-container">
            <div className="video-wrapper">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={false}
                className="user-video"
              />
            </div>

            <div className="call-controls">
              <button className={`control-btn ${isMuted ? "off" : ""}`} onClick={toggleMute}>
                {isMuted ? "🔇" : "🎙️"}
              </button>
              <button className={`control-btn ${!isVideoOn ? "off" : ""}`} onClick={toggleVideo}>
                {isVideoOn ? "📷" : "🚫"}
              </button>
              <button className="control-btn end" onClick={endCall}>
                🔴 End
              </button>
            </div>

            <div className="recording-indicator">
              <span className="dot" /> LIVE
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
