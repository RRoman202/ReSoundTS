import { useEffect } from "react";
import { Button } from "antd";
import * as Tone from "tone";

export let url: string = "https://tonejs.github.io/audio/salamander/";
export let filename: string = "C4.mp3";

function playExample(url: string, filename: string) {
  const player = new Tone.Player(url + filename).toDestination();
  Tone.loaded().then(() => {
    player.start();
  });
}
function ChooseSoundFunction() {
  const ChooseSound = (soundname: string) => {
    switch (soundname) {
      case "arp": {
        url = "https://tonejs.github.io/audio/berklee/";
        filename = "Arp_note.mp3";
        break;
      }
      case "piano": {
        url = "https://tonejs.github.io/audio/salamander/";
        filename = "C4.mp3";
        break;
      }
      case "bang": {
        url = "https://tonejs.github.io/audio/berklee/";
        filename = "Bang_Tin_1.mp3";
        break;
      }
      case "kalimba": {
        url = "https://tonejs.github.io/audio/berklee/";
        filename = "Kalimba_1.mp3";
        break;
      }
      default: {
        break;
      }
    }
    playExample(url, filename);
  };
  useEffect(() => {}, [url]);
  return (
    <>
      <p>
        <Button type="primary" onClick={() => ChooseSound("piano")}>
          Piano
        </Button>
      </p>
      <p>
        <Button type="primary" onClick={() => ChooseSound("arp")}>
          Arp Synth
        </Button>
      </p>
      <p>
        <Button type="primary" onClick={() => ChooseSound("bang")}>
          Bang
        </Button>
      </p>
      <p>
        <Button type="primary" onClick={() => ChooseSound("kalimba")}>
          Kalimba
        </Button>
      </p>
    </>
  );
}

export default ChooseSoundFunction;