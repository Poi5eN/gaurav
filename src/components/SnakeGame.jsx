import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SnakeGame = ({ onExit }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Game constants
  const CANVAS_SIZE = 400;
  const GRID_SIZE = 20;
  const INITIAL_SNAKE = [{ x: 10, y: 10 }];
  const INITIAL_DIRECTION = { x: 1, y: 0 };
  const SPEED = 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let snake = [...INITIAL_SNAKE];
    let direction = { ...INITIAL_DIRECTION };
    let food = getRandomFood();
    let gameLoop;
    let isPaused = false;

    function getRandomFood() {
      return {
        x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
        y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
      };
    }

    function draw() {
      // Clear canvas
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // Draw Grid (Optional, makes it look more 'terminal')
      ctx.strokeStyle = "#333";
      for (let i = 0; i < CANVAS_SIZE; i += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, CANVAS_SIZE);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(CANVAS_SIZE, i);
        ctx.stroke();
      }

      // Draw Food
      ctx.fillStyle = "#ff0055"; // Pinkish Red
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#ff0055";
      ctx.fillRect(
        food.x * GRID_SIZE,
        food.y * GRID_SIZE,
        GRID_SIZE - 2,
        GRID_SIZE - 2
      );
      ctx.shadowBlur = 0;

      // Draw Snake
      ctx.fillStyle = "#00ff88"; // Neon Green
      snake.forEach((segment, index) => {
        if (index === 0) {
          // Head
          ctx.fillStyle = "#00ff88";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#00ff88";
        } else {
          // Body
          ctx.fillStyle = "#00cc6a";
          ctx.shadowBlur = 0;
        }
        ctx.fillRect(
          segment.x * GRID_SIZE,
          segment.y * GRID_SIZE,
          GRID_SIZE - 2,
          GRID_SIZE - 2
        );
      });
    }

    function update() {
      if (gameOver || isPaused) return;

      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

      // Check collision with walls
      if (
        head.x < 0 ||
        head.x >= CANVAS_SIZE / GRID_SIZE ||
        head.y < 0 ||
        head.y >= CANVAS_SIZE / GRID_SIZE ||
        snake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        clearInterval(gameLoop);
        return;
      }

      snake.unshift(head);

      // Check collision with food
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10);
        food = getRandomFood();
      } else {
        snake.pop();
      }

      draw();
    }

    function handleKeyDown(e) {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) direction = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (direction.y === 0) direction = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (direction.x === 0) direction = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (direction.x === 0) direction = { x: 1, y: 0 };
          break;
        case "Escape":
          onExit();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    gameLoop = setInterval(update, SPEED);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(gameLoop);
    };
  }, [gameOver]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl mb-4 font-mono text-[#00ff88] animate-pulse">
        SNAKE // SCORE: {score}
      </h2>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-4 border-[#333] rounded-lg shadow-2xl bg-[#1a1a1a]"
      />
      <div className="mt-4 text-sm text-gray-400 font-mono">
        Use Arrow Keys to Move | ESC to Exit
      </div>
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10 flex-col">
          <h1 className="text-4xl text-red-500 font-bold mb-4 font-mono">
            GAME OVER
          </h1>
          <button
            onClick={() => {
              setGameOver(false);
              setScore(0);
            }}
            className="px-6 py-2 bg-[#00ff88] text-black font-bold rounded hover:bg-white transition-all font-mono"
          >
            RESTART
          </button>
          <button
            onClick={onExit}
            className="mt-4 text-white underline hover:text-red-400 font-mono"
          >
            Exit to Terminal
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
