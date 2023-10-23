import { useState, useEffect } from "react";
import { Prog } from "./Pages/Piano";
import { index } from "../player/playCanvas";

interface PositionProps {
  index: number;
}

export let position: number;
export const GetPosition: React.FC<PositionProps> = ({ index }) => {
  position = { index }.index;
  console.log(position);
  return null;
};
const ProgressBar = () => {
  useEffect(() => {
    position = index;
    console.log(position);
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
    </div>
  );
};

export default ProgressBar;
