import { Modal, Button } from "antd";
import { useState } from "react";

function ModalReverb() {
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
        Эхо
      </Button>
      <Modal
        title="Эхо"
        open={isModalOpen}
        okText="Ок"
        cancelText="Отмена"
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
}

export default ModalReverb;
