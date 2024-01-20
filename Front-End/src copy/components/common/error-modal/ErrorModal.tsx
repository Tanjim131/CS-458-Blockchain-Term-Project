import React, { FC } from "react";
import { Modal, Space } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

import "./ErrorModal.less";

/**
 * Interface for Common Error Modal.
 */
interface IErrorModal {
  visible: boolean;
  footer?: any;
  onCancel: () => void;
  children: {};
  className?: string;
}

/**
 * This is used for ErrorModal
 *
 * @usage: <ErrorModal isModalVisible={visible} onCancel={function}/>
 */
const ErrorModal: FC<IErrorModal> = (props: IErrorModal) => {
  const { visible, footer, onCancel, children } = props;

  return (
    <Modal
      visible={visible}
      footer={footer}
      centered={true}
      maskClosable={true}
      onCancel={onCancel}
      className="error-modal"
      destroyOnClose={true}
    >
      <div className="modal-content-wrapper">
        <Space direction={"vertical"} size={"middle"}>
          <CloseCircleOutlined className="check-circle-icon" />
          {children}
        </Space>
      </div>
    </Modal>
  );
};

export default ErrorModal;
