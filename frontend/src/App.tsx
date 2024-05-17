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
  const [loading, setLoading] = useState(true);
  const [gameId, setGameId] = useState<string>("");

  // Function to add a message to the messages array
  const handleMessageAddition = (message: string) => {
    // Update state using setMessages
    const timestamp = getCurrentTimeStamp();
    const newMessage = { content: message, timestamp };
    setGameMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  //useEffect(() => {
  //  let isMounted = true; // Flag to track component mount state

  const handleButtonClick = (buttonId: string) => {
    console.log("HANDLE BUTTON CLICK");
    alert(buttonId);
    if (buttonId == "start") {
      const createGame = async () => {
        try {
          const response = await fetch("/duel/get_next_game_id");
          if (!response.ok) {
            throw new Error("Failed to create a game");
          }
          const gameId = await response.json();
          //if (isMounted) {
          // Update state only if the component is still mounted
          setGameId(gameId.inserted_id);
          //onTokenReceived("Game created");
          //}
        } catch (error) {
          console.error("Error creating a game:", error);
          //onTokenReceived(" - Error creating a game");
        } finally {
          //if (isMounted) {
          // Update loading state only if the component is still mounted
          setLoading(false);
          //}
        }
      };
      createGame();
    }
  };

  useEffect(() => {
    console.log("GAME ID IS " + gameId);
  }, [gameId]);

  //}, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    // Call handleMessageAddition once when the component mounts
    handleMessageAddition("Game #12345 started.");
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <PlayerInputForm />
      <GameControls onButtonClick={handleButtonClick} />
      <MessageBox messages={gameMessages} />
      <ProgressTokens onTokenReceived={handleMessageAddition} />
    </div>
  );
};

export default App;
