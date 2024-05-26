import React, { useState } from "react";
import { useGame } from "./GameContext";

const GameControls = () => {
  const { isGameRunning, startGame, finishGame } = useGame();
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const handleStartGame = () => {
    if (player1Name.trim() === "" || player2Name.trim() === "") {
      alert("Please enter names for both players.");
      return;
    }
    startGame(player1Name, player2Name);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Player 1 Name"
        value={player1Name}
        onChange={(e) => setPlayer1Name(e.target.value)}
        hidden={isGameRunning}
      />
      <br />
      <input
        type="text"
        placeholder="Enter Player 2 Name"
        value={player2Name}
        onChange={(e) => setPlayer2Name(e.target.value)}
        hidden={isGameRunning}
      />
      <br />
      <button onClick={handleStartGame} disabled={isGameRunning}>
        Start game
      </button>
      <button onClick={finishGame} disabled={!isGameRunning}>
        Finish game
      </button>
    </div>
  );
};

export default GameControls;
