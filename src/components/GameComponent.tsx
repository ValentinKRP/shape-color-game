import React, { useState, useEffect, useRef } from 'react';
import { Game } from '../models/Game';
import GameElementComponent from './GameElementComponent';
import { GameElementInterface } from '../models/GameElementInterface';
import { db, saveScore, fetchPlayers } from '../firebase';
import LeaderboardComponent from './LeaderBoardComponent';
interface PlayerData {
  name: string;
  score: number;
}

const GameComponent: React.FC = () => {
  const [elements, setElements] = useState<GameElementInterface[]>([]);
  const [playersData, setPlayersData] = useState<PlayerData[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [ongoingTime, setOngoingTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameLost, setGameLost] = useState<boolean>(false);
  const gameInstance = Game.getInstance();

  const colorChangeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadPlayers = refreshLeaderboard

    loadPlayers();
  }, []);

  const refreshLeaderboard = async () => {
    const players = await fetchPlayers(db);
    players.sort((a, b) => a.score - b.score);
    setPlayersData(players);
  };

  useEffect(() => {
    if (gameWon || gameLost) {
      if (colorChangeIntervalRef.current) {
        clearInterval(colorChangeIntervalRef.current);
      }
    }
  }, [gameWon, gameLost]);

  const startGame = () => {
    gameInstance.reset();

    setElements([...gameInstance.getElements()]);

    const newStartTime = Date.now();

    setStartTime(newStartTime);
    setOngoingTime(0);

    setGameWon(false);
    setGameLost(false);

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    const newTimerInterval = setInterval(() => {
      setOngoingTime(Date.now() - newStartTime);
    }, 1000);
    setTimerInterval(newTimerInterval);

    colorChangeIntervalRef.current = setInterval(() => {
      gameInstance.changeColorOfChangeElements();
      setElements([...gameInstance.getElements()]);
    }, 2000);
  };

  const resetTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    const endTime = Date.now();
    if (startTime !== null) {
      setOngoingTime(endTime - startTime);
    }



  }

  const gameIsLost = () => {
    resetTimer();
    setGameLost(true);
  }

  const gameIsWon = (element: GameElementInterface) => {
    setElements(prevElements => prevElements.filter(el => el.id !== element.id));
    gameInstance.removeElementById(element.id);

    if (gameInstance.isGameWon()) {
      resetTimer();
      setGameWon(true);
    }
  }

  const handleClick = (element: GameElementInterface) => {
    switch (element.type) {
      case 'Avoid':
        gameIsLost()
        break;

      case 'Collect':
        gameIsWon(element)
        break;

      case 'Change':
        if (element.color === 'red') {
          gameIsLost()
        }

        gameIsWon(element)
        break;
    }
  };

  return (
    <div>
      <button onClick={startGame}>Start Game</button>
      {!gameLost && !gameWon && (
        <p>Timer: {Math.floor(ongoingTime / 1000)} seconds</p>
      )
      }
      {gameLost && (
        <div>
          <p>You Lost!</p>
          <p>Time Taken: {Math.floor(ongoingTime / 1000)} seconds</p>
        </div>
      )}
      {gameWon && (
        <div>
          <p>You Won!</p>
          <p>Time Taken: {Math.floor(ongoingTime / 1000)} seconds</p>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter Your Name"
          />
          <button onClick={() => saveScore(playerName, Math.floor(ongoingTime / 1000), refreshLeaderboard)}>Save Score</button>
        </div>
      )}

      <div className='shapes-container'>
        {elements.map((element, index: number) => (
          <GameElementComponent key={index} element={element} handleClick={() => handleClick(element)} />
        ))}
      </div>

      <LeaderboardComponent playersData={playersData}></LeaderboardComponent>
    </div>
  );
};

export default GameComponent;