import React, { FC } from "react";
import { Button } from "antd";
import "./iconButton.less";

/*
 interface for Icon Button component
*/
interface IIconButtonProps {
  onClickEvent: () => void;
  btnText: string;
  Icon: any;
  className?: string;
}

/**
 * this is used to add Custom IconButton
 * @usage: <IconButton onClickEvent= {} btnText={string}/>
 * @param props
 */
const IconButton: FC<IIconButtonProps> = (props) => {
  const { onClickEvent, btnText, className, Icon } = props;
  return (
    <Button type="link" className={`btn-icon-default ${className?className:''}`} onClick={onClickEvent}>
      <Icon className="btn-icon-icon" /> {btnText}
    </Button>
  );
};

export default IconButton;
