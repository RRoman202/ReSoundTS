import Getnotes from "../../player/Notes";
import { Row, Button, Col } from "antd";
import { Sound, SoundRemove } from "../../handlers/btnClickPianoRoll";
const notes = Getnotes();

export default function PianoTiles() {
  const rows: JSX.Element[] = [];
  for (let i = 0; i < notes.length; i++) {
    rows.push(
      <Row key={i.toString()}>
        <Button
          className={"ant-btn-default " + keyColor(notes[i])}
          onMouseDown={() => Sound(notes[i])}
          onMouseUp={() => SoundRemove()}
          onMouseLeave={() => SoundRemove()}
        >
          {notes[i]}
        </Button>
      </Row>
    );
  }
  return <Col className="pianoCol">{rows}</Col>;
}
function keyColor(note: string): string {
  if (note.includes("#")) {
    return "gridBlack";
  } else {
    return "gridWhite";
  }
}
