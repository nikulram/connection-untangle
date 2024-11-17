// CelebrationScreen
// Author: Nikul Ram
// This displays a celebration message when level is successfully completed.

import React from "react";

const CelebrationScreen = () => {
  return (
    <div
      style={{
        display: "flex", // Center content up and down
        alignItems: "center", // Align items to the center
        justifyContent: "center", // Center content Up
        height: "100vh", // Full height
        backgroundColor: "#121212", // Dark background color
      }}
    >
      {/* Celebration message */}
      <h1
        style={{
          fontSize: "4rem", // Large font size
          color: "#FFD166", // Yellow-orange text color
          textShadow: "0px 0px 20px #FFD166, 0px 0px 40px #FFD166", // Glowing text
          animation: "pop 1s infinite ease-in-out", // Pop animation
        }}
      >
        🎉 Level Completed! 🎉
      </h1>
    </div>
  );
};

export default CelebrationScreen;
