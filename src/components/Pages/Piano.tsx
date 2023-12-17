import React from "react";
import VolumeSlider from "./VolumeSoundControl";
import ModalChooseSound from "./ModalChooseSound";
import BpmInput from "./chooseBPM";
import CanvasTimeSignature from "./TimeSignatureBar";
import { ClearCanv } from "../Canvas/ClearCanvasBtn";
import { RecordCanvas } from "./SaveAudio";
import "./SaveAudio";
import PianoTiles from "./PianoTiles";
import { observer } from "mobx-react";
import Getnotes from "../../player/Notes";
import { PlayCanv } from "../../player/playCanvas";
import "./SaveAudio";
import { Button } from "antd";
import "./Piano.css";
import { url, filename } from "./chooseSound";
import { backDown, backUp } from "./scrollFunction";
import "../../handlers/keyboardHandler";
import { Row, Layout, Tooltip } from "antd";
import {
  CaretUpOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  SoundTwoTone,
  BorderOutlined,
  PauseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { GridCanvas } from "../Canvas/Canvas";
import { BaseUrl } from "../../player/playSound";
const notes = Getnotes();
let isPlaying = false;
const { Header, Content, Footer } = Layout;
interface ProgressBarProps {
  handleStartMoving: () => void;
  stopMoving: () => void;
  pauseMoving: () => void;
}

let startProgressBar: () => void;
let stopMovingBar: () => void;
let pauseMovingBar: () => void;
export const Prog: React.FC<ProgressBarProps> = ({
  handleStartMoving,
  stopMoving,
  pauseMoving,
}) => {
  startProgressBar = { handleStartMoving }.handleStartMoving;
  stopMovingBar = { stopMoving }.stopMoving;
  pauseMovingBar = { pauseMoving }.pauseMoving;
  return null;
};
const Piano = observer(() => {
  return (
    <>
      <Layout className="layoutPiano">
        <Header className="header">
          <div className="divMenuPiano">
            <Tooltip title="Вверх" className="btnUp">
              <Button
                icon={<CaretUpOutlined />}
                type="primary"
                onClick={backUp}
              />
            </Tooltip>
            <ModalChooseSound></ModalChooseSound>
            <BpmInput></BpmInput>
            <Button
              onClick={RecordCanvas}
              type="primary"
              className="record-button"
            >
              Записать
            </Button>
            <Tooltip title="Очистить">
              <Button
                className="delete-button"
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={ClearCanv}
              ></Button>
            </Tooltip>

            <SoundTwoTone className="soundicon" />
            <VolumeSlider></VolumeSlider>
          </div>
        </Header>
        <Content id="contentLayout" className="contentLayout">
          <div className="pianoDiv">
            <Row
              style={{
                flexWrap: "nowrap",
              }}
            >
              <PianoTiles></PianoTiles>

              <div className="grid-canvas">
                <PlayCanv></PlayCanv>
                <div>
                  <CanvasTimeSignature
                    width={1920}
                    height={20}
                    spacing={160}
                  ></CanvasTimeSignature>
                  <GridCanvas
                    rows={notes.length}
                    cols={48}
                    cellSize={40}
                  ></GridCanvas>
                </div>
              </div>
            </Row>
          </div>
        </Content>
        <Footer className="footer">
          <Tooltip title="Вниз" className="btnUp">
            <Button
              icon={<CaretDownOutlined />}
              type="primary"
              onClick={backDown}
            />
          </Tooltip>
          <div className="play-btn">
            <Tooltip title="Пауза">
              <Button
                onClick={() => {
                  isPlaying = false;
                  pauseMovingBar();
                }}
                type="primary"
                shape="circle"
                className="pause-button"
                icon={<PauseCircleOutlined />}
              ></Button>
            </Tooltip>
            <Tooltip title="Пуск">
              <Button
                onClick={() => {
                  if (!isPlaying) {
                    isPlaying = true;
                    startProgressBar();
                  }
                }}
                type="primary"
                shape="circle"
                className="play-button"
                icon={<CaretRightOutlined />}
              ></Button>
            </Tooltip>
            <Tooltip title="Стоп">
              <Button
                onClick={() => {
                  isPlaying = false;
                  stopMovingBar();
                }}
                type="primary"
                shape="circle"
                icon={<BorderOutlined />}
              ></Button>
            </Tooltip>
          </div>
        </Footer>
      </Layout>
      <BaseUrl url={url} filename={filename}></BaseUrl>
    </>
  );
});

export default Piano;
