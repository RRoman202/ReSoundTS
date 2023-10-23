import { Modal, Button } from "antd";
import { useState } from "react";
import ModalReverb from "./ModalReverb";

function ModalChooseEffects() {
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
  return (
    <>
      <Button
        type="primary"
        className="choose-sound-button"
        onClick={showModal}
      >
        Эффекты
      </Button>
      <Modal
        title="Эффекты"
        open={isModalOpen}
        okText="Ок"
        cancelText="Отмена"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          <ModalReverb></ModalReverb>
        </p>
      </Modal>
    </>
  );
}

export default ModalChooseEffects;
