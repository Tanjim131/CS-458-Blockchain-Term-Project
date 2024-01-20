import React, { FC } from "react";
import { Button as AntButton }  from "antd";


/**
 * this is used to add Custom Button Component
 * @usage: <Button type={ButtonType} />
 * @param props
 */
const Button = (props) => {
  const { id="", onClick, children, disabled = false, className = "", htmlType, icon, href } = props;

  return (
    <AntButton
      id={id}
      onClick={onClick}
      disabled={ disabled }
      htmlType={htmlType}
      icon={icon}
      href={href}
      className={className}
    >
      {children}
    </AntButton>
  );
};

export default Button;
