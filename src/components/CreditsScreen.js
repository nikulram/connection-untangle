// CreditsScreen
// Author: Nikul Ram
// This displays credits for the game, including the author, background music attribution, and educational references about planar graphs from where I got the inspiration.
// Includes links for credits, such as songs used, Non Copyright Music has been credited by link below/credits screen

import React from "react";

const CreditsScreen = ({ onBackToMenu }) => {
  return (
    <div
      style={{
        display: "flex", // Center content
        flexDirection: "column", // Stack elements
        alignItems: "center", // Align center
        justifyContent: "center", // Center
        height: "100vh", // Full height
        backgroundColor: "#121212", // Dark bg
      }}
    >
      {/* Title credits screen */}
      <h1
        style={{
          fontSize: "3rem", // fontsize
          color: "#FFD700", // Gold color
        }}
      >
        Credits
      </h1>

      {/* Author Information */}
      <p
        style={{
          color: "white", // White text
          fontSize: "1.2rem", 
          margin: "20px", // Space around text
          textAlign: "center",
        }}
      >
        Game created by{" "}
        <strong>Nikul Ram</strong> for <strong>WOLFJAM 2024</strong>.
        <br />
        Visit my website:{" "}
        <a
          href="https://nikulram.com" // Link to my website :)
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#06D6A0", // Highlighted link color
            textDecoration: "none", 
            fontWeight: "bold", // Bold
          }}
        >
          nikulram.com
        </a>
      </p>

      {/* for background music */}
      <p
        style={{
          color: "white", 
          fontSize: "1.2rem",
          margin: "20px", 
          textAlign: "center",
        }}
      >
        Background music by{" "}
        <a
          href="https://pixabay.com/music/beats-good-night-lofi-cozy-chill-music-160166/" // Link to the music source giving credit to owner of music.
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#06D6A0", 
            textDecoration: "none", 
          }}
        >
          Pixabay Beats - "Good Night Lofi Cozy Chill Music"
        </a>
      </p>

      {/* Reference to Planar Graph Wikipedia where I got my inpiration */}
      <p
        style={{
          color: "white", 
          fontSize: "1.2rem", 
          margin: "20px", 
          textAlign: "center",
        }}
      >
        Learn more about planar graphs on{" "}
        <a
          href="https://en.wikipedia.org/wiki/Planar_graph#:~:text=In%20graph%20theory%2C%20a%20planar,no%20edges%20cross%20each%20other." // Link to the Wikipedia page (About planar graphs)
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#06D6A0", 
            textDecoration: "none", 
          }}
        >
          Wikipedia
        </a>.
      </p>

      {/* Reference to Discrete Math Open Source for Mathematical research I did*/}
      <p
        style={{
          color: "white", 
          fontSize: "1.2rem",
          margin: "20px", 
          textAlign: "center",
        }}
      >
        Explore more concepts about planar graphs at{" "}
        <a
          href="https://discrete.openmathbooks.org/dmoi3/sec_planar.html" // Link to the Discrete Math open source reference for more research
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#06D6A0",
            textDecoration: "none",
          }}
        >
          Discrete Mathematics - Open Source
        </a>.
      </p>

      {/* Back to Menu Button */}
      <button
        onClick={onBackToMenu} // Function to navigate back to main menu
        style={{
          padding: "10px 20px", // Padding
          margin: "10px", 
          fontSize: "1.2rem", 
          borderRadius: "5px",
          border: "none", // No border
          backgroundColor: "#EF476F",
          color: "white",
          cursor: "pointer",
        }}
      >
        Back to Menu
      </button>
    </div>
  );
};

export default CreditsScreen;
