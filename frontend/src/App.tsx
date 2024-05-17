import React, { useState, useEffect } from "react";
import PlayerInputForm from "./PlayerInputForm";
import GameControls from "./GameControls";
import MessageBox from "./MessageBox";
import ProgressTokens from "./ProgressTokens";
import { getCurrentTimeStamp } from "./utils"; // Import the utility function

// Define the interface for a message
interface Message {
  content: string;
  timestamp: string;
}

const App: React.FC = () => {
  const [gameMessages, setGameMessages] = useState<Message[]>([]);

  // Function to add a message to the messages array
  const handleMessageAddition = (message: string) => {
    // Update state using setMessages
    const timestamp = getCurrentTimeStamp();
    const newMessage = { content: message, timestamp };
    setGameMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    // Call handleMessageAddition once when the component mounts
    handleMessageAddition("Game #12345 started.");
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <PlayerInputForm />
      <GameControls />
      <MessageBox messages={gameMessages} />
      <ProgressTokens onTokenReceived={handleMessageAddition} />
    </div>
  );
};

export default App;
