import React, { useState, useEffect } from "react";

const ProgressTokens = ({
  onTokenReceived,
}: {
  onTokenReceived: (message: string) => void;
}) => {
  const [progressTokens, setProgressTokens] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchProgressTokens = async () => {
        try {
          const response = await fetch("/duel/get_progress_tokens");
          if (!response.ok) {
            throw new Error("Failed to fetch progress tokens");
          }
          const progressTokensTmp = await response.json();
          setProgressTokens(progressTokensTmp.tokens);
          onTokenReceived("Tokens fetched");
        } catch (error) {
          console.error("Error fetching progress tokens:", error);
          onTokenReceived(" - Error fetching progress tokens");
        } finally {
          setLoading(false);
        }
      };

      fetchProgressTokens();
    }, 3000); // 3000 milliseconds = 3 seconds
  }, []); // Empty dependency array to ensure the effect runs only once

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
