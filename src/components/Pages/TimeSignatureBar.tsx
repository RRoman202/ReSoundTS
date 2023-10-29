import React, { useRef, useEffect } from "react";
import "../../components/Pages/Piano.css";

interface CanvasProps {
  width: number;
  height: number;
  spacing: number;
}

const CanvasTimeSignature: React.FC<CanvasProps> = ({
  width,
  height,
  spacing,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");

      if (context) {
        context.clearRect(0, 0, width, height);

        let x = spacing;
        const y = height / 2; // фиксированное значение для y
        let num = 1;

        context.fillStyle = "white";
        while (x < width - spacing) {
          // измененная логика цикла
          context.fillText(num.toString(), x, y);
          num++;
          x += spacing;
        }
      }
    }
  }, [width, height, spacing]);

  return (
    <div className="signature">
      <canvas ref={canvasRef} width={width} height={height} />;
    </div>
  );
};

export default CanvasTimeSignature;
