import React, { FC } from "react";
import { Modal } from "antd";
import Button, { ButtonType } from "../button/Button";
import translate from "../../../../i18n/translate";

import "./ConfirmModal.less";

/**
 * Interface for Common Confirm Modal.
 */
interface IConfirmModal {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  children: {};
  centered?: boolean;
  onConfirmBtnText?: string;
  title: string;
  disableConfirmBtn?: boolean;
}

/**
 * This is used for ConfirmModal
 *
 * @usage: <ConfirmModal isModalVisible={visible} onCancel={function}/>
 */
const ConfirmModal: FC<IConfirmModal> = (props: IConfirmModal) => {
  const { visible, onCancel, onConfirm, children, centered = false, title, disableConfirmBtn= false, onConfirmBtnText= translate("confirm") } = props;

  return (
    <Modal
      title={title}
      visible={visible}
      centered={centered}
      onCancel={onCancel}
      className="confirm-modal"
      footer={[
        <Button key="1" className="width_auto" children={translate("cancel")} type={ButtonType.NORMAL} onClick={onCancel} />,
        <Button key="2" className="width_auto" children={onConfirmBtnText} type={ButtonType.PRIMARY} disabled={disableConfirmBtn} onClick={onConfirm} />,
      ]}
    >
      {children}
    </Modal>
  );
};

export default ConfirmModal;
