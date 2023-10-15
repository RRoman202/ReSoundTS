import React, { useState } from "react";
import { Slider } from "antd";
import { VolumeValue } from "../../player/playSound";
import "./Piano.css";

const VolumeSlider = () => {
  const [volume, setVolume] = useState(100);
  const [volumeminus, setVolumeminus] = useState(0);
  const handleVolumeChange = (value: number) => {
    setVolume(value);
    setVolumeminus(value - 100);
  };

  return (
    <div>
      <Slider
        className="slider-sound"
        trackStyle={{ backgroundColor: "white" }}
        railStyle={{ backgroundColor: "blue" }}
        value={volume}
        onChange={handleVolumeChange}
      />
      <VolumeValue volume={volumeminus}></VolumeValue>
    </div>
  );
};

export default VolumeSlider;
