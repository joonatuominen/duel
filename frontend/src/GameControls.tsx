import React, { useState } from "react";

const GameControls = ({
  onButtonClick,
}: {
  onButtonClick: (buttonId: string) => void;
}) => {
  return (
    <div>
      <button onClick={() => onButtonClick("start")}>Start game</button>
      <button onClick={() => onButtonClick("finish")}>Finish game</button>
    </div>
  );
};

export default GameControls;
