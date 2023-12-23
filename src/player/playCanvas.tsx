import GetNotes from "../player/Notes";
import React, { useState } from "react";
import { sampler } from "./playSound";
import * as Tone from "tone";
import { Prog } from "../components/Pages/Sequencer/Piano";
// import "../components/Pages/Piano.css";

const notes: string[] = GetNotes();

interface MatrixProps {
  grid: boolean[][];
}

export let m: boolean[][];
export const Matrix: React.FC<MatrixProps> = ({ grid }) => {
  m = { grid }.grid;
  return null;
};
function newbpm(bpmvalue: number) {
  Tone.Transport.bpm.value = bpmvalue;
}
interface bpmProps {
  bpmvalue: number;
}
export const BpmValue: React.FC<bpmProps> = ({ bpmvalue }) => {
  newbpm({ bpmvalue }.bpmvalue);
  return null;
};

export const PlayCanv: React.FC = () => {
  const recorder = new Tone.Recorder();
  sampler.connect(recorder);
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
  function checkNotesPlay() {
    let lastNonEmptyListKey = 0;
    for (const key in notesplay) {
      if (notesplay[key].length > 0) {
        lastNonEmptyListKey = Number(key);
      }
    }

    return Math.ceil(lastNonEmptyListKey / 4 + 0.25) * 4;
  }
  function playNote() {
    checkNotesPlay();
    const notesp = notesplay[index];

    for (let n = 0; n < notesp.length; n++) {
      sampler.triggerAttackRelease(notesp[n], "8n");
    }
    GetNotesPlay();

    index = (index + 1) % checkNotesPlay();
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
  async function stop() {
    isPlaying = false;

    index = 0;
    setPosition(index);
    Tone.Transport.cancel();

    Tone.Transport.stop();
  }
  function pause() {
    isPlaying = false;
    index = position;
    Tone.Transport.cancel();
    Tone.Transport.pause();
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: (position - 1) * 40 + "px",
            visibility: "visible",
            width: "3px",
            height: "3375px",
            backgroundColor: "orange",
          }}
        ></div>
      </div>

      <Prog
        handleStartMoving={play}
        stopMoving={stop}
        pauseMoving={pause}
      ></Prog>
    </>
  );
};
