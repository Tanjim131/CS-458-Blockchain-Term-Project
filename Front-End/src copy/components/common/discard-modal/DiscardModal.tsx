import React, { FC } from "react";
import { Modal, Space } from "antd";

import Button, { ButtonType } from "../button/Button";
import translate from "../../../../i18n/translate";
import "./DiscardModal.less";

/**
 * Interface for Common Discard Modal.
 */
interface IDiscardModal {
    visible: boolean;
    onCancel: () => void;
    children: {};
    className?: string;
    width?: number | undefined;
    style?: {};
    twoButton?: boolean;
    lastButtonDisable?: boolean;
    middleButtonDisable?: boolean;
    lastButtonText?: string;
    title?: string;
    cancelButtonType?: ButtonType;
    middleButtonType?: ButtonType;
    lastButtonType?: ButtonType;
    middleButtonText?: string;
    handleLastButton: () => void;
    handleMiddleButton?: () => void;
}

/**
 * This is used for DiscardModal
 *
 * @usage: <DiscardModal/>
 */
const DiscardModal: FC<IDiscardModal> = (props: IDiscardModal) => {
    const { visible, onCancel, children, className, style, width = undefined, title="discard_new_request",
        twoButton=true, lastButtonDisable=false, middleButtonDisable=false, lastButtonText = "yes_discard_request",
        middleButtonText = "save_as_draft", handleLastButton, handleMiddleButton = () => {},
        cancelButtonType = ButtonType.LINK, middleButtonType = ButtonType.SECONDARY, lastButtonType = ButtonType.PRIMARY} = props;

    return (
        <Modal
            title={translate(title)}
            destroyOnClose={true}
            visible={visible}
            maskClosable={true}
            onCancel={onCancel}
            className={`discard-modal ${className}`}
            centered={true}
            closable={true}
            width={width}
            style={style}
            footer={
                twoButton
                ? [
                    <Button key="cancel" type={cancelButtonType} onClick={onCancel}> {translate("cancel")}</Button>,
                    <Button key="discard" disabled={lastButtonDisable} type={lastButtonType} onClick={handleLastButton}>
                        {translate(lastButtonText)}
                    </Button>,
                ]
                : [
                    <Button key="cancel" type={cancelButtonType} onClick={onCancel}> {translate("cancel")}</Button>,
                    <Button key="draft" disabled={middleButtonDisable} type={middleButtonType} onClick={handleMiddleButton}>
                        {translate(middleButtonText)}
                    </Button>,
                    <Button key="discard" disabled={lastButtonDisable} type={lastButtonType} onClick={handleLastButton}>
                        {translate(lastButtonText)}
                    </Button>
                ]
            }
        >
            {children}
        </Modal>
    );
};

export default DiscardModal;
