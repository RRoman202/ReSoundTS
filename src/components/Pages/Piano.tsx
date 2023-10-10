import React, { FC, MouseEvent } from "react";
import { useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import { Sound } from "../../handlers/btnClickPianoRoll";
import { Button, Grid } from "antd";
import "./Piano.css";
import playSounds, { m } from "../../player/playCanvas";
import Getnotes from "../../player/Notes";
import "../../handlers/keyboardHandler";
import {
  Col,
  Row,
  Layout,
  FloatButton,
  Watermark,
  Tooltip,
  Dropdown,
  Space,
  message,
  Slider,
} from "antd";
import Sider from "antd/es/layout/Sider";
import {
  CaretUpOutlined,
  CaretRightOutlined,
  DownOutlined,
  CaretDownOutlined,
  SoundTwoTone,
} from "@ant-design/icons";
import { GridCanvas } from "../Canvas/Canvas";
import { SoundRemove } from "../../handlers/btnClickPianoRoll";

const notes = Getnotes();

const handleMenuClick = (e: MouseEvent) => {
  message.info("Выбран звук");
};

const { Header, Content, Footer } = Layout;

function Piano() {
  const rows: JSX.Element[] = [];
  for (let i = 0; i < notes.length; i++) {
    rows.push(
      <Row key={i.toString()}>
        <Button
          className={"ant-btn-default " + keyColor(notes[i])}
          onMouseDown={() => Sound(notes[i])}
          onMouseUp={() => SoundRemove(notes[i])}
          onMouseLeave={() => SoundRemove(notes[i])}
        >
          {notes[i]}
        </Button>
      </Row>
    );
  }
  return (
    <>
      <Layout className="layoutPiano">
        <Header
          className="header"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="divMenuPiano">
            <Tooltip title="Вверх" className="btnUp">
              <Button
                icon={<CaretUpOutlined />}
                type="primary"
                onClick={backUp}
              />
            </Tooltip>

            <div
              style={{
                color: "white",
              }}
            ></div>

            <SoundTwoTone
              style={{
                fontSize: "25px",
                position: "absolute",
                right: "0",
                marginRight: "170px",
                marginTop: "4px",
              }}
            />
            <Slider
              style={{
                width: "100px",
                position: "absolute",
                right: "0",
                marginRight: "55px",
              }}
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
              <GridCanvas
                rows={notes.length}
                cols={140}
                cellSize={40}
              ></GridCanvas>
            </Row>
          </div>
        </Content>
        <Footer
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#001529",
            height: "64px",
          }}
        >
          <Tooltip title="Вниз" className="btnUp">
            <Button
              icon={<CaretDownOutlined />}
              type="primary"
              onClick={backDown}
            />
          </Tooltip>
          <Button
            onClick={() => playSounds(m)}
            type="primary"
            shape="circle"
            className="play-btn"
            icon={<CaretRightOutlined />}
          ></Button>
        </Footer>
      </Layout>
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

function keyColor2(note: string): string {
  if (note.includes("#")) {
    return "btnPiano";
  } else {
    return "btnPianoWhite";
  }
}

function backUp(): void {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
function backDown(): void {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
}

Piano.propTypes = {
  window: PropTypes.func,
};

export default Piano;
