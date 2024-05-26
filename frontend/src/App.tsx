import React, { useState } from "react";
import ReactDOM from "react-dom";
import PlayerInputForm from "./PlayerInputForm";
import GameControls from "./GameControls";
import { GameProvider } from "./GameContext";
import MessageBox from "./MessageBox";
import ProgressTokens from "./ProgressTokens";
import GameStatus from "./GameStatus";

// Define the interface for a message
interface Message {
  content: string;
  timestamp: string;
}

const App = () => {
  return (
    <GameProvider>
      <GameControls />
      <GameStatus />
      <PlayerInputForm />
      <MessageBox />
      <ProgressTokens />
    </GameProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
