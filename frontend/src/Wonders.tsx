import React, { useState, useEffect } from "react";
import { useGame } from "./GameContext";

//type WondersResponse = {
//  wonders: string[][];
//};

const Wonders = () => {
  /*if (!wonders || !wonders.length) {
    // Handle the case where wonders data is not available
    return <div>No wonders data available</div>;
  }*/

  const { gameId, handleMessageAddition } = useGame();
  const [wonders, setWonders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) return;

    let isMounted = true; // Flag to track component mount state

    const fetchWonders = async () => {
      try {
        const response = await fetch("/duel/get_wonders");
        if (!response.ok) {
          throw new Error("Failed to fetch wonders");
        }
        const wondersTmp = await response.json();
        if (isMounted) {
          // Update state only if the component is still mounted
          setWonders(wondersTmp.wonders);
          handleMessageAddition("Wonders fetched");
        }
      } catch (error) {
        console.error("Error fetching wonders:", error);
        handleMessageAddition(" - Error fetching wonders");
      } finally {
        if (isMounted) {
          // Update loading state only if the component is still mounted
          setLoading(false);
        }
      }
    };

    fetchWonders();
    console.log(wonders);

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
        {wonders.map((wonder: string, index: number) => (
          <li key={index} className="wonder">
            {wonder}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wonders;
