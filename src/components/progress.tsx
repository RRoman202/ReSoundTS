import { useState, useEffect } from "react";
import { Prog } from "./Pages/Piano";

function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

interface ProgressProps {
  position: number;
}
export let positionn: number;
export const ProgressPosition: React.FC<ProgressProps> = ({ position }) => {
  positionn = { position }.position;
  console.log(positionn);
  return null;
};

const ProgressBar = () => {
  const [position, setPosition] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const moveComponent = () => {
    setPosition((prevPosition) => prevPosition + 10);
  };

  const handleStartMoving = () => {
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
    const progress = async () => {
      if (isMoving) {
        await delay(125);
        moveComponent();
      }
    };
    progress();
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
