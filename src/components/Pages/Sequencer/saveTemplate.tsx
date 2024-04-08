import * as Tone from "tone";
import { sampler } from "../../../player/playSound";
import { m } from "../../../player/playCanvas";
import GetNotes from "../../../player/Notes";
import { Button } from "antd";

export default function SaveTemplateNotes() {
  const saveNotes = (notes: boolean[][], filename: string) => {
    const data = { notes };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={() => saveNotes(m, "template.json")}>Сохранить как</Button>
  );
}
