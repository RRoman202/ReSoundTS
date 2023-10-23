import GetNotes from "../player/Notes";
import React from "react";
import { sampler } from "./playSound";
import * as Tone from "tone";

const notes: string[] = GetNotes();

interface MatrixProps {
  grid: boolean[][];
}

export let m: boolean[][];
export const Matrix: React.FC<MatrixProps> = ({ grid }) => {
  m = { grid }.grid;
  return null;
};
export let index = 0;
let notesplay: { [key: number]: string[] } = {};
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
let isPlaying: boolean = false;

function playNote() {
  const notesp = notesplay[index];
  for (let n = 0; n < notesp.length; n++) {
    sampler.triggerAttackRelease(notesp[n], "8n");
  }
  GetNotesPlay();
  index = (index + 1) % m[0].length;
}
export function play() {
  if (!isPlaying) {
    isPlaying = true;
    GetNotesPlay();
    Tone.Transport.scheduleRepeat(playNote, "8n");
    Tone.Transport.start();
  }
}
export function stop() {
  isPlaying = false;
  index = 0;
  Tone.Transport.cancel();
  Tone.Transport.stop();
}
