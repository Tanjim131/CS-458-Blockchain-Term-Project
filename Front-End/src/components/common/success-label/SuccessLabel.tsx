import React, { FC, useEffect, useState } from "react";
import { Alert } from "antd";
import { connect } from "react-redux";
import { showToast } from "../../../../redux/common/action";
import { CheckCircleOutlined } from "@ant-design/icons";
import translate from "../../../../i18n/translate";

/**
 * props for SuccessLabel
 */
interface ISuccessLabelProps {
  text: string;
  iconColor?: string;
  textColor?: string;
}

/**
 * component for SuccessLabel
 * <SuccessLabel text={string}/>
 * @param props
 */
const SuccessLabel: FC<ISuccessLabelProps> = (props: ISuccessLabelProps) => {
  const { text, textColor, iconColor } = props;

  return (
    <span style={{ color: iconColor ? iconColor : "#52c41a" }}>
      <CheckCircleOutlined />
      <span
        style={{ paddingLeft: "5px", color: textColor ? textColor : "#52c41a" }}
      >
        {translate(text)}
      </span>
    </span>
  );
};

export default SuccessLabel;
