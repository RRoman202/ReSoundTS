import React, { useState, useRef, useEffect } from "react";
import Getnotes from "../../player/Notes";
import { Sound, SoundRemove } from "../../handlers/btnClickPianoRoll";
import { Matrix } from "../../player/playCanvas";

interface GridCanvasProps {
  rows: number;
  cols: number;
  cellSize: number;
}

const notes = Getnotes();

export const GridCanvas: React.FC<GridCanvasProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState<boolean[][]>(() => {
    const rows = Array.from({ length: props.rows }, () =>
      Array.from({ length: props.cols }, () => false)
    );
    return rows;
  });

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedCell, setDraggedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  function drawCells() {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx.fillStyle = "#2D2E2E";
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);
      for (let row = 0; row < props.rows; row++) {
        for (let col = 0; col < props.cols; col++) {
          if (grid[row][col]) {
            ctx.fillStyle = "lightblue";
            ctx.fillRect(
              col * props.cellSize,
              row * props.cellSize,
              props.cellSize,
              props.cellSize
            );
          }
          ctx.strokeStyle = "#4B4D4D";
          ctx.strokeRect(
            col * props.cellSize,
            row * props.cellSize,
            props.cellSize,
            props.cellSize
          );
        }
      }
    }
  }
  useEffect(() => {
    console.log(grid);
    drawCells();
  }, [grid]);

  function handleClick(row: number, col: number) {
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
    drawCells();
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (isDragging && draggedCell) {
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / props.cellSize);
      const y = Math.floor((e.clientY - rect.top) / props.cellSize);
      if (x !== draggedCell.col || y !== draggedCell.row) {
        const newGrid = [...grid];
        newGrid[y][x] = true;
        newGrid[draggedCell.row][draggedCell.col] = false;
        Sound(notes[y]);
        setGrid(newGrid);
        setDraggedCell({ row: y, col: x });
        drawCells();
      }
    }
  }

  function handleMouseUp() {
    setIsDragging(false);
    setDraggedCell(null);
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={props.cols * props.cellSize}
        height={props.rows * props.cellSize}
        onMouseDown={(e) => {
          const rect = canvasRef.current!.getBoundingClientRect();
          const x = Math.floor((e.clientX - rect.left) / props.cellSize);
          const y = Math.floor((e.clientY - rect.top) / props.cellSize);
          Sound(notes[y]);
          handleClick(y, x);
          setIsDragging(true);
          setDraggedCell({ row: y, col: x });
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={(e) => {
          const rect = canvasRef.current!.getBoundingClientRect();
          const x = Math.floor((e.clientX - rect.left) / props.cellSize);
          const y = Math.floor((e.clientY - rect.top) / props.cellSize);
          SoundRemove(notes[y]);
          handleMouseUp();
        }}
      />
      <Matrix grid={grid}></Matrix>
    </div>
  );
};
