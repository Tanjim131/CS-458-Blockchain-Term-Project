import React, { FC } from "react";
import { Modal, Space } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

import "./SuccessModal.less";

/**
 * Interface for Common Success Modal.
 */
interface ISuccessModal {
  visible: boolean;
  footer?: any;
  onCancel: () => void;
  children: {};
  className?: string;
  centered?: boolean;
  width?: number | undefined;
  style?: {};
}

/**
 * This is used for SuccessModal
 *
 * @usage: <SuccessModal isModalVisible={visible} onCancel={function}/>
 */
const SuccessModal: FC<ISuccessModal> = (props: ISuccessModal) => {
  const { visible, footer, onCancel, children, className, centered = false, style, width= undefined } = props;

  return (
    <Modal
      visible={visible}
      footer={footer}
      maskClosable={true}
      onCancel={onCancel}
      className={`success-modal ${className}`}
      centered={centered}
      destroyOnClose={true}
      closable={false}
      width={width}
      style={style}
    >
      <div className="modal-content-wrapper">
        <Space direction={"vertical"} size={"middle"}>
          <CheckCircleFilled className="check-circle-icon" />
          {children}
        </Space>
      </div>
    </Modal>
  );
};

export default SuccessModal;
