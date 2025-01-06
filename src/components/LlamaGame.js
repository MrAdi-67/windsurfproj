import React, { useState, useEffect, useCallback } from 'react';

const GROUND_HEIGHT = 50;
const GAME_HEIGHT = 300;
const LLAMA_HEIGHT = 50;
const LLAMA_WIDTH = 40;
const INITIAL_POSITION = GROUND_HEIGHT;

const LlamaGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('llamaHighScore')) || 0
  );
  const [llamaPosition, setLlamaPosition] = useState(INITIAL_POSITION);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [gameSpeed, setGameSpeed] = useState(5);

  const jump = useCallback(() => {
    if (!isJumping && isPlaying) {
      setIsJumping(true);
      setLlamaPosition(prev => prev + 120);
      
      setTimeout(() => {
        setLlamaPosition(INITIAL_POSITION);
        setIsJumping(false);
      }, 500);
    }
  }, [isJumping, isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setLlamaPosition(INITIAL_POSITION);
    setObstacles([{ 
      x: 800,
      width: 30,
      height: 40
    }]);
    setGameSpeed(5);
    setIsJumping(false);
  };

  const gameOver = () => {
    setIsPlaying(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('llamaHighScore', score.toString());
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        if (!isPlaying) {
          startGame();
        } else {
          jump();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, jump]);

  useEffect(() => {
    let gameLoop;
    if (isPlaying) {
      gameLoop = setInterval(() => {
        setScore(prev => prev + 1);
        
        setObstacles(prev => {
          const newObstacles = prev
            .map(obs => ({ ...obs, x: obs.x - gameSpeed }))
            .filter(obs => obs.x > -50);

          if (Math.random() < 0.02 && newObstacles.length < 3) {
            newObstacles.push({
              x: 800,
              width: 30,
              height: Math.random() * 20 + 40 // Height between 40-60
            });
          }

          // Collision detection
          const LLAMA_X = 80; // Llama's fixed x position
          const LLAMA_Y = llamaPosition; // Current height from bottom

          for (const obs of newObstacles) {
            // Check if llama overlaps with obstacle horizontally
            const horizontalCollision = 
              LLAMA_X < (obs.x + obs.width) && 
              (LLAMA_X + LLAMA_WIDTH) > obs.x;

            // Check if llama overlaps with obstacle vertically
            // LLAMA_Y is distance from bottom, so if it's less than obstacle height + ground height,
            // and the llama isn't jumping higher than the obstacle, there's a collision
            const verticalCollision = LLAMA_Y <= (GROUND_HEIGHT + obs.height);

            if (horizontalCollision && verticalCollision) {
              console.log('Collision detected!');
              console.log('Llama position:', LLAMA_Y);
              console.log('Obstacle height:', GROUND_HEIGHT + obs.height);
              console.log('Obstacle x:', obs.x);
              gameOver();
              break;
            }
          }

          return newObstacles;
        });

        setGameSpeed(prev => Math.min(prev + 0.005, 15));
      }, 1000 / 60);
    }
    return () => clearInterval(gameLoop);
  }, [isPlaying, llamaPosition, gameSpeed]);

  return (
    <div className="game-container" onClick={isPlaying ? jump : startGame}>
      <div className="game-area">
        <div 
          className="llama"
          style={{ 
            bottom: `${llamaPosition}px`
          }}
        />
        {obstacles.map((obstacle, index) => (
          <div
            key={index}
            className="obstacle"
            style={{
              left: `${obstacle.x}px`,
              width: `${obstacle.width}px`,
              height: `${obstacle.height}px`
            }}
          />
        ))}
        <div className="ground" />
      </div>
      <div className="score-container">
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
      </div>
      {!isPlaying && (
        <div className="start-message">
          Press Space or Click to {score > 0 ? 'Restart' : 'Start'}
        </div>
      )}
    </div>
  );
};

export default LlamaGame;
