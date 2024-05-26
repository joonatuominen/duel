import React, { useState, useEffect } from "react";
import { useGame } from "./GameContext";

const ProgressTokens = () => {
  const { gameId, handleMessageAddition } = useGame();
  const [progressTokens, setProgressTokens] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) return;

    let isMounted = true; // Flag to track component mount state

    const fetchProgressTokens = async () => {
      try {
        const response = await fetch("/duel/get_progress_tokens");
        if (!response.ok) {
          throw new Error("Failed to fetch progress tokens");
        }
        const progressTokensTmp = await response.json();
        if (isMounted) {
          // Update state only if the component is still mounted
          setProgressTokens(progressTokensTmp.tokens);
          handleMessageAddition("Tokens fetched");
        }
      } catch (error) {
        console.error("Error fetching progress tokens:", error);
        handleMessageAddition(" - Error fetching progress tokens");
      } finally {
        if (isMounted) {
          // Update loading state only if the component is still mounted
          setLoading(false);
        }
      }
    };

    fetchProgressTokens();

    // Cleanup function to be executed when the component unmounts
    return () => {
      isMounted = false; // Mark component as unmounted
    };
  }, [gameId, handleMessageAddition]); // Dependency array now includes gameId

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul>
        {progressTokens.map((token: string, index: number) => (
          <li key={index} className="progress-token">
            {token}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressTokens;
