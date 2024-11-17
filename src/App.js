// App
// Author: Nikul Ram
// This component is the main entry point for the game.
// It manages the navigation between different screens like : (menu, levels, game, and credits).
// Also, it handles background music playback, mute/unmute functionality, and best times tracking.


import React, { useState, useEffect } from "react";
import ConnectionUntangle from "./components/ConnectionUntangle"; // Game 
import MainMenu from "./components/MainMenu"; // Main menu 
import CreditsScreen from "./components/CreditsScreen"; // Credits screen 
import "./App.css"; // Global styles (css)

function App() {
  //for managing the current screen being displayed (menu, levels, game, or credits)
  const [currentScreen, setCurrentScreen] = useState("menu");

  //for tracking the current level selected by the player
  const [currentLevel, setCurrentLevel] = useState(0);

  //determining whether the game is paused
  const [isPaused, setIsPaused] = useState(false);

  //managing the mute/unmute status of the background music
  const [isMuted, setIsMuted] = useState(false);

  //for recording the best times for every level
  const [bestTimes, setBestTimes] = useState({});

  //storing the audio object for background music
  const [audio, setAudio] = useState(null);

  /**
   * Initializes background music and makes sure it plays only after user interaction.(With Button)
   * Cleans up the event listener when the component is unmounted.
   */
  useEffect(() => {
    const backgroundMusic = new Audio("/background.mp3"); // Load the background music
    backgroundMusic.loop = true; // Loop the music continuously
    backgroundMusic.volume = 0.5; //initial volume
    setAudio(backgroundMusic); // Save audio object in state

    const handleUserInteraction = () => {
      // Play music "ONLY" if it's not muted
      if (!isMuted) {
        backgroundMusic.play().catch((err) => {
          console.warn("Autoplay blocked: ", err.message);
        });
      }
      // Remove the event listener after the first interaction
      document.removeEventListener("click", handleUserInteraction);
    };

    // Listen for user interaction to allow autoplay
    document.addEventListener("click", handleUserInteraction);

    // Clean up when the component is unmounted
    return () => {
      document.removeEventListener("click", handleUserInteraction);
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, []);

  /**
   * Toggles music playback based on the mute/unmute.
   * Ensures the audio starts or stops correctly.
   */
  useEffect(() => {
    if (audio) {
      if (isMuted) {
        audio.pause(); // Pause the music if muted
      } else {
        audio.play().catch((err) => {
          console.warn("Autoplay blocked: ", err.message);
        });
      }
    }
  }, [isMuted, audio]);

  /**
   * Starts game for selected level.
   * Resets pause state and displays the game screen.
   */
  const startGame = (level) => {
    setCurrentLevel(level); // Set selected level
    setCurrentScreen("game"); // Switch to game screen
    setIsPaused(false); // Unpause game
  };

  /**
   * Navigates back to main menu and resets selected level.
   */
  const backToMenu = () => {
    setCurrentScreen("menu");
    setCurrentLevel(0);
  };

  /**
   * Opens the levels selection screen.
   */
  const openLevels = () => {
    setCurrentScreen("levels");
  };

  /**
   * Updates best time for a specific level.
   * If level has no previous best time, it sets new time as the best.
   */
  const updateBestTime = (level, time) => {
    setBestTimes((prev) => ({
      ...prev,
      [level]: prev[level] ? Math.min(prev[level], time) : time, // Record the shortest time(For Highscore/Best)
    }));
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#1E1E1E", // main background color
        color: "white", // Default text color
        minHeight: "100vh", //app spans full height of the viewport
      }}
    >
      {/* Render main menu */}
      {currentScreen === "menu" && (
        <MainMenu
          openLevels={openLevels} // Function to navigate to levels screen
          setIsMuted={setIsMuted} // Toggle mute/unmute
          isMuted={isMuted} // Pass current mute
          openCredits={() => setCurrentScreen("credits")} // Navigate to credits screen
        />
      )}

      {/* Render levels selection screen */}
      {currentScreen === "levels" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#121212",
            color: "white",
            padding: "20px",
          }}
        >
          <h2
            style={{
              color: "#FFD700", // Gold color title
              marginBottom: "20px",
              fontSize: "2rem",
              fontWeight: "bold",
              textShadow: "0px 0px 10px #FFD700",
            }}
          >
            Select a Level
          </h2>
          {/* Render all levels in a grid for clean look*/}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
              gap: "15px",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            {Array.from({ length: 30 }, (_, i) => (
              <button
                key={i}
                onClick={() => startGame(i)} // Start selected level
                style={{
                  padding: "10px 15px",
                  fontSize: "1rem",
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#06D6A0",
                  color: "white",
                  cursor: "pointer",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.boxShadow = "0px 6px 10px rgba(0, 0, 0, 0.5)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.3)")
                }
              >
                Level {i + 1}
              </button>
            ))}
          </div>
          {/* Back to Menu button */}
          <button
            onClick={backToMenu}
            style={{
              marginTop: "30px",
              padding: "10px 20px",
              backgroundColor: "#EF476F",
              color: "white",
              fontSize: "1.2rem",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              border: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.boxShadow = "0px 6px 10px rgba(0, 0, 0, 0.5)")
            }
            onMouseLeave={(e) =>
              (e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.3)")
            }
          >
            Back to Menu
          </button>
        </div>
      )}

      {/* Render game screen */}
      {currentScreen === "game" && (
        <ConnectionUntangle
          currentLevel={currentLevel} // Pass selected level
          onBackToLevels={openLevels} // Navigate back to levels screen
          onBackToMenu={backToMenu} // Navigate back to menu
          isPaused={isPaused} // Pass pause state
          setIsPaused={setIsPaused} // Function to toggle pause state
          updateBestTime={updateBestTime} // Update best time for the level
          bestTime={bestTimes[currentLevel] || null} // Pass best time for the level
          isMuted={isMuted} // Pass mute
          setIsMuted={setIsMuted} // Function to toggle mute
        />
      )}

      {/* Render credits screen */}
      {currentScreen === "credits" && (
        <CreditsScreen onBackToMenu={backToMenu} /> // Navigate back to menu
      )}
    </div>
  );
}

export default App;
