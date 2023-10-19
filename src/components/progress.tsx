import { useState, useEffect } from "react";
import { Prog } from "./Pages/Piano";

const ProgressBar = () => {
  const [position, setPosition] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const moveComponent = () => {
    setPosition((prevPosition) => prevPosition + 10);
  };

  const handleStartMoving = async () => {
    if (!isMoving) {
      setIsMoving(true);
      console.log("start moving");
      setPosition(0);
    }
  };

  const stopMoving = () => {
    setIsMoving(false);
  };

  useEffect(() => {
    if (isMoving) {
      const intervalId = setInterval(() => {
        moveComponent();
        console.log(position);
      }, 125);
      return () => clearInterval(intervalId);
    }
  });
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: position,
          width: "3px",
          height: "3360px",
          backgroundColor: "blue",
          opacity: "0.5",
        }}
      ></div>
      <Prog
        handleStartMoving={handleStartMoving}
        stopMoving={stopMoving}
      ></Prog>
    </div>
  );
};

export default ProgressBar;
