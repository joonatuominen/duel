import React, { useState, useEffect, FC } from "react";

interface Message {
  content: string;
  timestamp: string;
}

interface MessageBoxProps {
  messages: Message[];
}

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

export default MessageBox;
