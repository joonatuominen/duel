import React, { useState, useEffect } from "react";
import PlayerInputForm from "./PlayerInputForm";
import GameControls from "./GameControls";
import MessageBox from "./MessageBox";
import ProgressTokens from "./ProgressTokens";

// Define the interface for a message
interface Message {
  content: string;
  timestamp: string;
}

const App: React.FC = () => {
  const [gameMessages, setGameMessages] = useState<Message[]>([]);

  const getCurrentTimeStamp = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };

  // Function to add a message to the messages array
  const addMessage = (message: string) => {
    // Update state using setMessages
    const timestamp = getCurrentTimeStamp();
    const newMessage = { content: message, timestamp };
    setGameMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    // Call addMessage once when the component mounts
    addMessage("From main");
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <PlayerInputForm />
      <GameControls />
      <MessageBox messages={gameMessages} />
      <ProgressTokens onTokenReceived={addMessage} />
    </div>
  );
};

export default App;
