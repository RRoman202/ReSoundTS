import { useState, useEffect } from "react";
import { Prog } from "./Pages/Piano";

function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
const ProgressBar = () => {
  const [position, setPosition] = useState<number>(0);

  const moveComponent = () => {
    setPosition((prevPosition) => prevPosition + 1.05);
    requestAnimationFrame(moveComponent);
  };

  const handleStartMoving = async () => {
    requestAnimationFrame(moveComponent);
  };

  return (
    <div style={{ position: "relative", height: "200px" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: position,
          width: "2px",
          height: "3400px",
          backgroundColor: "blue",
        }}
      ></div>
      <Prog handleStartMoving={handleStartMoving}></Prog>
    </div>
  );
};

export default ProgressBar;
