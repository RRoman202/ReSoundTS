import * as Tone from "tone";
import { sampler } from "../../player/playSound";
const now = Tone.now();

const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];

let index = 0;

function playNote() {
  const note = notes[index];
  sampler.triggerAttackRelease(note, "8n");
  index = (index + 1) % notes.length;
}
export function play() {
  Tone.Transport.scheduleRepeat(playNote, "8n");
  Tone.Transport.start();
}
export function stop() {
  index = 0;
  Tone.Transport.cancel();
  Tone.Transport.stop();
}
