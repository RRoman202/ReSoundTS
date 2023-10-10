import { sampler } from "../player/playSound";
const AudioKeys = require("audiokeys");

const keyboard = new AudioKeys({
  rows: 2,
});

keyboard.down((key: any) => {
  sampler.triggerAttack(key.frequency);
});
keyboard.up((key: any) => {
  sampler.triggerRelease(key.frequency);
});
