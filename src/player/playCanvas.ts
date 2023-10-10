import { GridCanvas } from "../components/Canvas/Canvas";
import GetNotes from "../player/Notes";
import { Sound, SoundRemove } from "../handlers/btnClickPianoRoll";

const notes: string[] = GetNotes();

interface MatrixProps {
  grid: boolean[][];
}

export let m: boolean[][];
export const Matrix: React.FC<MatrixProps> = ({ grid }) => {
  const matrix = { grid };
  const matrix2 = matrix.grid;
  m = matrix2;
  console.log(m);
  return null;
};

function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function playSounds(matrix: boolean[][]) {
  const numRows: number = matrix.length;
  const numCols: number = matrix[0].length;

  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      if (matrix[row][col] == true) {
        Sound(notes[row]);
        await delay(1);
      }
      await delay(1);
    }
  }
}

export default playSounds;
