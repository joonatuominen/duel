import React from "react";
import PlayerInputForm from "./PlayerInputForm";
import GameControls from "./GameControls";
import MessageBox from "./MessageBox";
import ProgressTokens from "./ProgressTokens";

const App: React.FC = () => {
  return (
    <div>
      <PlayerInputForm />
      <GameControls />
      <MessageBox />
      <ProgressTokens />
    </div>
  );
};

export default App;

/*
import React, { useState } from "react";
import PlayerInputForm from "./PlayerInputForm";
import GameControls from "./GameControls";
import MessageBox from "./MessageBox";
import ProgressTokens from "./ProgressTokens";

const App: React.FC = () => {
  const [gameMessages, setGameMessages] = useState<string[]>([]);

  // Function to add a message to the array
  const addMessage = (message: string) => {
    setGameMessages([...gameMessages, message]);
  };

  updateMessage("Start game");

  return (
    <div>
      <PlayerInputForm updateMessage={addMessage} />
      <GameControls updateMessage={addMessage} />
      <MessageBox gameMessages={gameMessages} />
      <ProgressTokens updateMessage={addMessage} />
    </div>
  );
};

export default App;
*/
