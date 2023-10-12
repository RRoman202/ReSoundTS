import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Sound } from "../../handlers/btnClickPianoRoll";
import { Button } from "antd";
import "./Piano.css";
import { url, filename } from "./chooseSound";
import ChooseSoundFunction from "./chooseSound";
import playSounds, { m } from "../../player/playCanvas";
import { backDown, backUp } from "./scrollFunction";
import Getnotes from "../../player/Notes";
import "../../handlers/keyboardHandler";
import ProgressBar from "../progress";
import { Col, Row, Layout, Tooltip, Slider, Modal } from "antd";
import {
  CaretUpOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  SoundTwoTone,
  PauseCircleFilled,
} from "@ant-design/icons";
import { GridCanvas } from "../Canvas/Canvas";
import { SoundRemove } from "../../handlers/btnClickPianoRoll";
import { BaseUrl } from "../../player/playSound";
const notes = Getnotes();

let isPlaying: boolean = false;
const { Header, Content, Footer } = Layout;
interface ProgressBarProps {
  handleStartMoving: () => void;
  stopMoving: () => void;
}
let startProgressBar: () => void;
let stopMovingBar: () => void;
export const Prog: React.FC<ProgressBarProps> = ({
  handleStartMoving,
  stopMoving,
}) => {
  startProgressBar = { handleStartMoving }.handleStartMoving;
  stopMovingBar = { stopMoving }.stopMoving;
  return null;
};
function Piano() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
            <Button
              type="primary"
              className="choose-sound-button"
              onClick={showModal}
            >
              Выбрать звук
            </Button>
            <Modal
              title="Выбор звука"
              open={isModalOpen}
              okText="Ок"
              cancelText="Отмена"
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <ChooseSoundFunction></ChooseSoundFunction>
            </Modal>
            <SoundTwoTone className="soundicon" />
            <Slider
              className="slider-sound"
              trackStyle={{
                backgroundColor: "blue",
              }}
              railStyle={{
                backgroundColor: "white",
              }}
            ></Slider>
          </div>
        </Header>
        <Content className="contentLayout">
          <div className="pianoDiv">
            <Row
              style={{
                flexWrap: "nowrap",
              }}
            >
              <Col className="pianoCol">{rows}</Col>
              <ProgressBar></ProgressBar>
              <GridCanvas
                rows={notes.length}
                cols={34}
                cellSize={40}
              ></GridCanvas>
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
                playSounds(m, isPlaying);
                isPlaying = true;

                startProgressBar();
              }}
              type="primary"
              shape="circle"
              className="play-button"
              icon={<CaretRightOutlined />}
            ></Button>
            <Button
              onClick={() => {
                stopMovingBar();
                SoundRemove();
                isPlaying = false;
              }}
              type="primary"
              shape="circle"
              icon={<PauseCircleFilled />}
            ></Button>
          </div>
        </Footer>
      </Layout>
      <BaseUrl url={url} filename={filename}></BaseUrl>
    </>
  );
}

function keyColor(note: string): string {
  if (note.includes("#")) {
    return "gridBlack";
  } else {
    return "gridWhite";
  }
}

Piano.propTypes = {
  window: PropTypes.func,
};

export default Piano;
