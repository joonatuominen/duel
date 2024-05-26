import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

import { getCurrentTimeStamp } from "./utils"; // Import the utility function

// Define the Message type
type Message = {
  content: string;
  timestamp: string;
};

type GameContextType = {
  isGameRunning: boolean;
  gameId: string;
  gameMessages: Message[];
  player1Name: string;
  player2Name: string;
  startGame: (player1Name: string, player2Name: string) => void;
  finishGame: () => void;
  handleMessageAddition: (message: string) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [loading, setLoading] = useState(true);
  const [gameId, setGameId] = useState<string>("");
  const [gameMessages, setGameMessages] = useState<Message[]>([]);

  //const getCurrentTimeStamp = (): string => {
  //  return new Date().toISOString();
  //};

  const startGame = (name1: string, name2: string) => {
    setIsGameRunning(true);
    const randomStartPlayer = Math.random() < 0.5 ? name1 : name2; // Randomly select starting player
    const startingPlayer = randomStartPlayer === name1 ? name1 : name2;
    const otherPlayer = randomStartPlayer === name1 ? name2 : name1;
    setPlayer1Name(startingPlayer);
    setPlayer2Name(otherPlayer);
    handleMessageAddition("Starting game...");
    const createGame = async () => {
      try {
        const response = await fetch("/duel/get_next_game_id");
        if (!response.ok) {
          throw new Error("Failed to create a game");
        }
        const data = await response.json();
        setGameId(data.inserted_id);
      } catch (error) {
        console.error("Error creating a game:", error);
        handleMessageAddition("Error creating a game");
      } finally {
        setLoading(false);
      }
    };

    createGame();
  };

  const finishGame = () => {
    setIsGameRunning(false);
    handleMessageAddition("Game finished.");
  };

  // Function to add a message to the messages array
  const handleMessageAddition = useCallback((message: string) => {
    const timestamp = getCurrentTimeStamp();
    const newMessage = { content: message, timestamp };
    setGameMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  useEffect(() => {
    if (gameId) {
      handleMessageAddition(
        `Game #` + gameId + `started between ${player1Name} and ${player2Name}`
      );
    }
  }, [gameId, player1Name, player2Name, handleMessageAddition]);

  return (
    <GameContext.Provider
      value={{
        isGameRunning,
        player1Name,
        player2Name,
        gameId,
        gameMessages,
        startGame,
        finishGame,
        handleMessageAddition,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
