// MainMenu
// Author: Nikul Ram
// Renders the main menu of the gamee, including options to play game, view credits, and toggle background music.

import React from "react";

const MainMenu = ({ openLevels, setIsMuted, isMuted, openCredits }) => {
  return (
    <div
      style={{
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        height: "100vh", 
        backgroundColor: "#121212", 
      }}
    >
      {/* Title of Game */}
      <h1
        style={{
          fontSize: "4rem", 
          color: "#FFD700", // Gold
          textShadow: "0 0 20px #FFD700, 0 0 40px #FFD700", // Glowing
        }}
      >
        Connection Untangle
      </h1>

      {/* Play Game Button */}
      <button
        onClick={openLevels} // Function to navigate to level selection screen
        style={{
          padding: "15px 30px", 
          margin: "10px", 
          fontSize: "1.5rem",
          width: "200px", // Fixed button width
          height: "50px", // Fixed button height
          borderRadius: "10px", 
          border: "none", 
          backgroundColor: "#06D6A0", 
          color: "white", 
          cursor: "pointer",
        }}
      >
        Play Game
      </button>

      {/* Credits Button */}
      <button
        onClick={openCredits} // Function to navigate to credits screen
        style={{
          padding: "15px 30px",
          margin: "10px",
          fontSize: "1.5rem",
          width: "200px", 
          height: "50px", 
          borderRadius: "10px", 
          border: "none", 
          backgroundColor: "#118AB2",
          color: "white", 
          cursor: "pointer",
        }}
      >
        Credits
      </button>

      {/* Mute/Unmute Music Button */}
      <button
        onClick={() => setIsMuted(!isMuted)} // Toggle mute/unmute
        style={{
          padding: "15px 30px",
          margin: "10px", 
          fontSize: "1.5rem", 
          width: "200px", 
          height: "50px", 
          borderRadius: "10px", // Rounded corners
          border: "none",
          backgroundColor: isMuted ? "#EF476F" : "#FFD166", // Red for muted, yellow for unmuted
          color: "white",
          cursor: "pointer", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isMuted ? "🔇" : "🔊"} {/* Display mute or unmute emoji */}
      </button>
    </div>
  );
};

export default MainMenu;
