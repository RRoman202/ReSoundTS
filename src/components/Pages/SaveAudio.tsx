import * as Tone from "tone";
import { sampler } from "../../player/playSound";
import { m } from "../../player/playCanvas";
import GetNotes from "../../player/Notes";
// console.clear();

// // UPDATE: there is a problem in chrome with starting audio context
// //  before a user gesture. This fixes it.
// var started = false;
// document.documentElement.addEventListener("mousedown", () => {
//   if (started) return;
//   started = true;
//   const audio = document.querySelector("audio");
//   const synth = new Tone.Synth();
//   const actx = Tone.context;
//   const dest = actx.createMediaStreamDestination();
//   const recorder = new MediaRecorder(dest.stream);

//   synth.connect(dest);
//   synth.toDestination();

//   const chunks: Blob[] = [];

//   const notes = "CDEF".split("").map((n) => `${n}4`);
//   let note = 0;
//   Tone.Transport.scheduleRepeat((time) => {
//     if (note === 0) recorder.start();
//     if (note > notes.length) {
//       synth.triggerRelease(time);
//       recorder.stop();
//       Tone.Transport.stop();
//     } else synth.triggerAttack(notes[note], time);
//     note++;
//   }, "4n");

//   recorder.ondataavailable = (evt) => chunks.push(evt.data);
//   recorder.onstop = (evt) => {
//     let blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
//     audio!.src = URL.createObjectURL(blob);
//   };

//   Tone.Transport.start();
// });
export function RecordCanvas() {
  const notes: string[] = GetNotes();
  let notesplay: { [key: number]: string[] } = {};
  const recorder = new Tone.Recorder();

  sampler.connect(recorder);
  let index = 0;
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
      sampler.triggerAttackRelease(notesp[n], "8n");
    }
    GetNotesPlay();
    index = (index + 1) % m[0].length;
  }
  GetNotesPlay();
  // start recording
  recorder.start();
  // generate a few notes
  Tone.Transport.scheduleRepeat(playNote, "8n");
  Tone.Transport.start();
  // wait for the notes to end and stop the recording
  setTimeout(async () => {
    // the recorded audio is returned as a blob
    const recording = await recorder.stop();
    Tone.Transport.cancel();
    Tone.Transport.stop();
    // download the recording by creating an anchor element and blob url
    const url = URL.createObjectURL(recording);
    const anchor = document.createElement("a");
    anchor.download = "recording.mp3";
    anchor.href = url;
    anchor.click();
    console.log((m[0].length * 1000) / (Tone.Transport.bpm.value / 60) / 2);
  }, (m[0].length * 1000) / (Tone.Transport.bpm.value / 60) / 2);
}
