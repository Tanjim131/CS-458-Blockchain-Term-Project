import React, { useState, FC } from "react";
import { Modal } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import Button, { ButtonType } from "../button/Button";
import { injectIntl, IntlShape } from "react-intl";

import "./AddDocumentSuccessModal.less";
/**
 * Interface for modal.
 */
interface IAddDocumentSuccessModalProps {
  intl: IntlShape;
  children: {};
  isModalVisible: boolean;
  modalTitle?: string;
  okBtnText?: string;
  cancelBtnText?: string;
  modalContent?: string;
  handleOk?: () => void;
  handleCancel?: () => void;
  handleInitiate?: () => void;
  initiateBtn?: boolean;
  initiateBtnText?: string;
}

/**
 * This is used for AddDocumentSuccessModal
 *
 * @usage: <AddDocumentSuccessModal isModalVisible={boolen} handleOk={function} handleCancel={function} handleInitiate?={function} initiateBtn={boolean}/>
 */
const AddDocumentSuccessModal: FC<IAddDocumentSuccessModalProps> = (props: IAddDocumentSuccessModalProps) => {
  const { intl, cancelBtnText = intl.formatMessage({ id: "cancel" }), okBtnText = intl.formatMessage({ id: "ok" }), handleOk, handleCancel, handleInitiate, initiateBtnText = intl.formatMessage({ id: "save-document-modal-initiatebtn" }), children, initiateBtn = false } = props;
  const [isModalVisible = false, setIsModalVisible] = useState(props.isModalVisible);

  return (
    <>
      <Modal
        className="add-document-success-modal"
        centered={true}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          initiateBtn && handleInitiate ?
          [
            <Button key={1} onClick={handleInitiate}>{initiateBtnText}</Button>,
            <Button key={2} type={ButtonType.LINK} onClick={handleCancel}>{okBtnText}</Button>,
            <Button key={3} type={ButtonType.LINK} onClick={handleOk}>{cancelBtnText}</Button>,
          ]
            :
          [
            <Button key={1} onClick={handleOk}>{cancelBtnText}</Button>,
            <Button key={2} type={ButtonType.LINK} onClick={handleCancel}>{okBtnText}</Button>,
          ]
        }
      >
        {children}
      </Modal>
    </>
  );
};

export default injectIntl(AddDocumentSuccessModal);
