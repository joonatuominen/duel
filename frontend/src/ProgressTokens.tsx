import React, { useState, useEffect } from "react";

const ProgressTokens: React.FC = () => {
  const [progressTokens, setProgressTokens] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgressTokens = async () => {
      try {
        const response = await fetch("/duel/get_progress_tokens");
        if (!response.ok) {
          throw new Error("Failed to fetch progress tokens");
        }
        const progressTokensTmp = await response.json();
        setProgressTokens(progressTokensTmp.tokens);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching progress tokens:", error);
        setLoading(false);
      }
    };

    fetchProgressTokens();
  }, []); // Empty dependency array to ensure the effect runs only once

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {progressTokens.map((token: string, index: number) => (
        <li key={index} className="progress-token">
          {token}
        </li>
      ))}
    </ul>
  );
};

export default ProgressTokens;
