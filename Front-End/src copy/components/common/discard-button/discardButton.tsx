import React, { FC } from "react";
import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./discardButton.less";

/*
 interface for Discard Button component
*/
interface IDiscardButtonProps {
  onClickEvent: () => void;
  btnText: string;
}

/**
 * this is used to add Custom DiscardButton
 * @usage: <DiscardButton onClickEvent= {} btnText={string}/>
 * @param props
 */
const DiscardButton: FC<IDiscardButtonProps> = (props) => {
  const { onClickEvent, btnText } = props;
  return (
    <Button type="link" className="btn-discard-default" onClick={onClickEvent}>
      <CloseCircleOutlined className="btn-discard-icon" /> {btnText}
    </Button>
  );
};

export default DiscardButton;
