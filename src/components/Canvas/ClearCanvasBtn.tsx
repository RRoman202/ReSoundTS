import React from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
interface ClearCanvasProps {
  ClearCanvass: () => void;
}
let ClearCanvasAll: () => void;
export const Canv: React.FC<ClearCanvasProps> = ({ ClearCanvass }) => {
  ClearCanvasAll = { ClearCanvass }.ClearCanvass;
  console.log(ClearCanvasAll);
  return null;
};
export const ClearCanv = () => {
  return (
    <Button
      type="primary"
      shape="circle"
      icon={<DeleteOutlined />}
      className="delete-button"
      onClick={ClearCanvasAll}
    ></Button>
  );
};
