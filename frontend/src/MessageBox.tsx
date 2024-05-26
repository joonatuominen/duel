import React, { useState, useEffect, FC } from "react";
import { useGame } from "./GameContext";

interface Message {
  content: string;
  timestamp: string;
}

interface MessageBoxProps {
  messages: Message[];
}

/*
const MessageBox: FC<MessageBoxProps> = ({
  messages,
}: {
  messages: { content: string; timestamp: string }[];
}) => {
  return (
    <div id="message-box">
      {messages.map((message, index) => (
        <p key={index}>
          {message.timestamp} - {message.content}
        </p>
      ))}
    </div>
  );
};
*/

const MessageBox = () => {
  const { gameMessages } = useGame();

  return (
    <div className="message-box">
      {gameMessages.map((message, index) => (
        <div key={index} className="message">
          <span>{message.timestamp}</span>: {message.content}
        </div>
      ))}
    </div>
  );
};

export default MessageBox;
