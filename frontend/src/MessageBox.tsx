import React, { useState } from "react";

const MessageBox: React.FC = () => {
  const [gameMessages, setGameMessages] = useState<string[]>([]);

  const currentTimeStamp = () => {
    // Assuming timestamp is a Unix timestamp in milliseconds
    // Convert the Unix timestamp to a Date object
    const date = new Date(new Date().getTime());

    // Get the individual components of the date (year, month, day, hours, minutes, seconds)
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Note: January is 0, so we add 1 to get the correct month
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the date as needed (e.g., YYYY-MM-DD HH:MM:SS)
    const formattedDate = `${day < 10 ? "0" + day : day}.${
      month < 10 ? "0" + month : month
    }.${year} ${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;

    return formattedDate;
  };

  // Input change handlers
  function updateMessageBox() {
    // Logic to update gameMessages, for example:
    const newItem = `Item ${gameMessages.length + 1}`; // Create a new item
    setGameMessages([...gameMessages, newItem]); // Push the new item into the array and update state

    console.log(messageString);
  }

  // Generate messageString using the updated gameMessages state
  const reversedMessages = gameMessages.slice().reverse();
  const messageString = reversedMessages.join("\n");

  return (
    <div id="message-box">
      <pre>{messageString}</pre>
    </div>
  );
};

export default MessageBox;
