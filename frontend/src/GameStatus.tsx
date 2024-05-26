// GameStatus.tsx
import React, { useState } from "react";
import styles from "./GameStatus.module.css"; // Adjust the import based on your CSS setup
import { useGame } from "./GameContext";

// Define the props interface
interface GameStatusProps {
  gameId: string; // or the appropriate type for gameId
}

const GameStatus = () => {
  const { gameId, player1Name, player2Name } = useGame();

  return (
    <div className={styles.gameno}>
      Game #{gameId}
      <br />
      {gameId ? (
        <p>
          Game is running between {player1Name} and {player2Name}
        </p>
      ) : (
        <p>No game currently running</p>
      )}
    </div>
  );
};

export default GameStatus;
