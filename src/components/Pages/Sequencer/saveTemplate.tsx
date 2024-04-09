import * as Tone from "tone";
import { sampler } from "../../../player/playSound";
import { m } from "../../../player/playCanvas";
import GetNotes from "../../../player/Notes";
import { Button } from "antd";
import { saveAs } from "file-saver";
import "./Piano.css";

export default function SaveTemplateNotes() {
  const saveNotes = () => {
    const data = { notes: m };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

    const filename = prompt("Введите название файла:");
    if (filename) {
      saveAs(blob, filename + ".resound");
    }
  };

  return (
    <Button className="save-btn" onClick={saveNotes}>
      Сохранить
    </Button>
  );
}
