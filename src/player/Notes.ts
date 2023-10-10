import React from "react";

function Getnotes(): string[] {
  const notes: string[] = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const octaves: number[] = [1, 2, 3, 4, 5, 6, 7];
  const allNotes: string[] = [];
  octaves.forEach((octave: number) => {
    notes.forEach((note: string) => {
      const noteName: string = note + octave;
      allNotes.push(noteName);
    });
  });
  return allNotes;
}

export default Getnotes;
