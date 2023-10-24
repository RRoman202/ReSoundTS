import GetNotes from "../player/Notes";
import React, { useState } from "react";
import { sampler } from "./playSound";
import * as Tone from "tone";
import { Prog } from "../components/Pages/Piano";

const notes: string[] = GetNotes();

interface MatrixProps {
  grid: boolean[][];
}

export let m: boolean[][];
export const Matrix: React.FC<MatrixProps> = ({ grid }) => {
  m = { grid }.grid;
  return null;
};
export const PlayCanv: React.FC = () => {
  let index = 0;
  let notesplay: { [key: number]: string[] } = {};
  const [position, setPosition] = useState<number>(0);
  let isPlaying: boolean = false;
  function GetNotesPlay() {
    const matrix = m;
    const numRows: number = matrix.length;
    const numCols: number = matrix[0].length;
    for (let col = 0; col < numCols; col++) {
      let colnotes: string[] = [];
      for (let row = 0; row < numRows; row++) {
        if (matrix[row][col]) {
          colnotes.push(notes[row]);
        }
      }
      notesplay[col] = colnotes;
    }
  }

  function playNote() {
    const notesp = notesplay[index];
    console.log(notesp);
    for (let n = 0; n < notesp.length; n++) {
      console.log(notesp[n]);
      sampler.triggerAttackRelease(notesp[n], "8n");
    }
    GetNotesPlay();
    index = (index + 1) % m[0].length;
    setPosition(index);
  }
  function play() {
    if (!isPlaying) {
      isPlaying = true;
      GetNotesPlay();
      Tone.Transport.scheduleRepeat(playNote, "8n");
      Tone.Transport.start();
    }
  }
  function stop() {
    isPlaying = false;
    index = 0;
    Tone.Transport.cancel();
    Tone.Transport.stop();
  }
  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: (position - 1) * 40 + "px",
            width: "3px",
            height: "3360px",
            backgroundColor: "blue",
            opacity: "0.5",
          }}
        ></div>
      </div>
      <Prog handleStartMoving={play} stopMoving={stop}></Prog>
    </>
  );
};
