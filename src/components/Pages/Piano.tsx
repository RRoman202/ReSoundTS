import React from "react";
import VolumeSlider from "./VolumeSoundControl";
import ModalChooseSound from "./ModalChooseSound";
import BpmInput from "./chooseBPM";
import PropTypes from "prop-types";
import PianoTiles from "./PianoTiles";
import Getnotes from "../../player/Notes";
import { PlayCanv } from "../../player/playCanvas";
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
function Piano() {
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
            <SoundTwoTone className="soundicon" />
            <VolumeSlider></VolumeSlider>
          </div>
        </Header>
        <Content className="contentLayout">
          <div className="pianoDiv">
            <Row
              style={{
                flexWrap: "nowrap",
              }}
            >
              <PianoTiles></PianoTiles>
              <PlayCanv></PlayCanv>
              <div className="grid-canvas">
                <GridCanvas
                  rows={notes.length}
                  cols={50}
                  cellSize={40}
                ></GridCanvas>
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
            <Button
              onClick={() => {
                isPlaying = false;
                stopMovingBar();
              }}
              type="primary"
              shape="circle"
              icon={<BorderOutlined />}
            ></Button>
          </div>
        </Footer>
      </Layout>
      <BaseUrl url={url} filename={filename}></BaseUrl>
    </>
  );
}

Piano.propTypes = {
  window: PropTypes.func,
};

export default Piano;
