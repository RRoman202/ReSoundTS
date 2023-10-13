import { useState, useEffect } from "react";
import { Prog } from "./Pages/Piano";

const ProgressBar = () => {
  const [position, setPosition] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);

  const moveComponent = () => {
    setPosition((prevPosition) => prevPosition + 1.05);
    setAnimationFrame(requestAnimationFrame(moveComponent));
  };

  const handleStartMoving = async () => {
    if (!isMoving) {
      setIsMoving(true);
      setPosition(0);
      setAnimationFrame(requestAnimationFrame(moveComponent));
    }
  };

  const stopMoving = () => {
    setIsMoving(false);
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      setAnimationFrame(null);
    }
  };

  useEffect(() => {
    if (position >= 5600) {
      setIsMoving(false);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        setAnimationFrame(null);
      }
    }
  }, [position]);
  return (
    <div style={{ position: "relative", height: "200px" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: position,
          width: "3px",
          height: "3400px",
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
