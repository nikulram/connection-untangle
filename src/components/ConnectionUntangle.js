// ConnectionUntangle
// Author: Nikul Ram
// This renders the main game logic for "Connection Untangle" game.
// It manages the points(dots), lines, timer, and interactions for solving levels.

import React, { useRef, useState, useEffect } from "react";

const ConnectionUntangle = ({
  currentLevel,
  onBackToLevels,
  onBackToMenu,
  isPaused,
  setIsPaused,
  updateBestTime,
  bestTime,
  toggleMusic,
  isMusicMuted,
}) => {
  // Refs & States
  const canvasRef = useRef(null); // Reference to the canvas element
  const [points, setPoints] = useState([]); // Coordinates of points
  const [lines, setLines] = useState([]); // Connections between points
  const [selectedPoint, setSelectedPoint] = useState(null); // Track which point is being dragged
  const [time, setTime] = useState(0); // Timer for the level
  const [crossingLines, setCrossingLines] = useState(0); // Count of intersecting lines
  const [showCompletionPopup, setShowCompletionPopup] = useState(false); // Whether to show the completion popup
  const radius = 10; // Radius of points
  const [intervalId, setIntervalId] = useState(null); // ID for timer interval.

  /**
   * Creates the points and lines for a given level.
   * @param {number} numPoints - Number of points to generate.
   */
  const createLevel = (numPoints) => {
    const centerX = 400; // Center of canvas (x-coordinate)
    const centerY = 400; // Center of canvas (y-coordinate)
    const circleRadius = 300; // Radius for point placement

    // Generate points in a circular/round layout
    const levelPoints = Array.from({ length: numPoints }, (_, i) => ({
      x: centerX + circleRadius * Math.cos((i / numPoints) * Math.PI * 2),
      y: centerY + circleRadius * Math.sin((i / numPoints) * Math.PI * 2),
    }));

    // Connect points in sequence
    const levelLines = Array.from({ length: numPoints }, (_, i) => [
      i,
      (i + 1) % numPoints,
    ]);

    shufflePoints(levelPoints); // Randomize point positions (shufflePoints)
    return { points: levelPoints, lines: levelLines };
  };

  /**
   * Randomizes the positions of points.
   * @param {Array} points - Array of points to shuffle.
   */
  const shufflePoints = (points) => {
    for (let i = 0; i < points.length; i++) {
      const j = Math.floor(Math.random() * points.length);
      [points[i], points[j]] = [points[j], points[i]]; // Swap the points
    }
  };

  /**
   * Loads the level data and resets the timer.
   * @param {number} numPoints - Number of points in the level.
   */
  const loadLevel = (numPoints) => {
    const levelData = createLevel(numPoints);
    setPoints(levelData.points);
    setLines(levelData.lines);
    setSelectedPoint(null);
    setShowCompletionPopup(false);
    setCrossingLines(countCrossingLines(levelData.points, levelData.lines));
    setTime(0); // Reset the timer
    if (intervalId) clearInterval(intervalId); // Clear previous timer
    const id = setInterval(() => setTime((prev) => prev + 1), 1000); // Start new timer
    setIntervalId(id);
  };

  /**
   * Load current level on component mount or level change.
   */
  useEffect(() => {
    loadLevel(4 + currentLevel); // Add 4 to increase difficulty
    return () => clearInterval(intervalId); // Clear timer on unmount
  }, [currentLevel]);

  /**
   * Draws the canvas whenever points or lines change.
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) draw(ctx); // Render points and lines
    setCrossingLines(countCrossingLines(points, lines)); // Update crossing line count
  }, [points, lines]);

  /**
   * Draws points and lines on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The drawing context.
   */
  const draw = (ctx) => {
    ctx.clearRect(0, 0, 800, 800); // Clear canvas
    drawLines(ctx);
    drawPoints(ctx);
  };

  /**
   * Draws the lines between points.
   * @param {CanvasRenderingContext2D} ctx - The drawing context.
   */
  const drawLines = (ctx) => {
    lines.forEach(([startIdx, endIdx]) => {
      const startPoint = points[startIdx];
      const endPoint = points[endIdx];
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  /**
   * Draws the points on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The drawing context.
   */
  const drawPoints = (ctx) => {
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2, true);
      ctx.fillStyle = "yellow";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "yellow";
      ctx.fill();
    });
  };

  /**
   * Counts the number of intersecting lines.
   */
  const countCrossingLines = () => {
    let crossingCount = 0;
    for (let i = 0; i < lines.length; i++) {
      for (let j = i + 1; j < lines.length; j++) {
        if (doLinesIntersect(lines[i], lines[j])) crossingCount++;
      }
    }
    return crossingCount;
  };

  /**
   * Determines whether two lines intersect.
   */
  const doLinesIntersect = ([aIdx, bIdx], [cIdx, dIdx]) => {
    const a = points[aIdx];
    const b = points[bIdx];
    const c = points[cIdx];
    const d = points[dIdx];

    if (aIdx === cIdx || aIdx === dIdx || bIdx === cIdx || bIdx === dIdx) {
      return false; // Shared endpoints
    }

    const orientation = (p, q, r) => {
      const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
      if (val === 0) return 0; // Collinear
      return val > 0 ? 1 : 2; // Clockwise or counterclockwise
    };

    const onSegment = (p, q, r) =>
      q.x <= Math.max(p.x, r.x) &&
      q.x >= Math.min(p.x, r.x) &&
      q.y <= Math.max(p.y, r.y) &&
      q.y >= Math.min(p.y, r.y);

    const o1 = orientation(a, b, c);
    const o2 = orientation(a, b, d);
    const o3 = orientation(c, d, a);
    const o4 = orientation(c, d, b);

    if (o1 !== o2 && o3 !== o4) return true;
    if (o1 === 0 && onSegment(a, c, b)) return true;
    if (o2 === 0 && onSegment(a, d, b)) return true;
    if (o3 === 0 && onSegment(c, a, d)) return true;
    if (o4 === 0 && onSegment(c, b, d)) return true;

    return false;
  };

  /**
   * Handles point selection when the mouse is pressed.
   */
  const handleMouseDown = (e) => {
    const { left, top } = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    points.forEach((point, idx) => {
      if (
        Math.sqrt((mouseX - point.x) ** 2 + (mouseY - point.y) ** 2) < radius
      ) {
        setSelectedPoint(idx);
      }
    });
  };

  /**
   * Handles point drag when the mouse is moved.
   */
  const handleMouseMove = (e) => {
    if (selectedPoint !== null) {
      const { left, top } = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;

      const updatedPoints = [...points];
      updatedPoints[selectedPoint] = { x: mouseX, y: mouseY };
      setPoints(updatedPoints);
    }
  };

  /**
   * Handles mouse release and checks for puzzle completion.
   */
  const handleMouseUp = () => {
    setSelectedPoint(null);

    if (crossingLines === 0) {
      clearInterval(intervalId); // Stop the timer
      setShowCompletionPopup(true); // Show completion popup
      updateBestTime(currentLevel, time); // Update the best time (Higscore)
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1A1A2E",
        gap: "20px",
      }}
    >
      {/* Sidebar with Level Info */}
      <div
        style={{
          textAlign: "center",
          color: "white",
          backgroundColor: "#2A2A40",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.2)",
        }}
      >
        <h1>Level {currentLevel + 1}</h1>
        <p>Best Time: {bestTime ? `${bestTime}s` : "N/A"}</p>
        <p>Lines Crossing: {crossingLines}</p>
        <p>Time: {time}s</p>
        <button
          onClick={onBackToLevels}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#EF476F",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Levels
        </button>
        <button
          onClick={() => setIsPaused(!isPaused)}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: isPaused ? "limegreen" : "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>

      {/* Game Canvas */}
      <div>
        <canvas
          ref={canvasRef}
          width={800}
          height={800}
          style={{
            border: "5px solid white",
            backgroundColor: "#0F0E17",
            boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>

      {/* Completion Popup */}
      {showCompletionPopup && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#2D1B5A",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#4CE0B3" }}>🎉 Well Done! 🎉</h2>
          <button
            onClick={onBackToLevels}
            style={{
              margin: "10px",
              padding: "10px 20px",
              backgroundColor: "#FFD700",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Back to Levels
          </button>
          <button
            onClick={onBackToMenu}
            style={{
              margin: "10px",
              padding: "10px 20px",
              backgroundColor: "#06D6A0",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Main Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectionUntangle;
