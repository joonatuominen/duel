// PlayerInputForm.tsx
import React, { useState } from "react";
import { useGame } from "./GameContext";

const PlayerInputForm = () => {
  const { isGameRunning } = useGame();

  return (
    <div>
      {/* Form logic here, can use isGameRunning to determine if input is enabled */}
    </div>
  );
};

export default PlayerInputForm;
