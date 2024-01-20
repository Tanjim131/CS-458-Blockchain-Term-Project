import React, { FC } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import translate from "../../../../i18n/translate";

/**
 * props for FailLabel
 */
interface IFailLabelProps {
  text: string;
  iconColor?: string;
  textColor?: string;
}

/**
 * component for FailLabel
 * <FailLabel text={string}/>
 * @param props
 */
const FailLabel: FC<IFailLabelProps> = (props: IFailLabelProps) => {
  const { text, textColor, iconColor } = props;

  return (
    <span style={{ color: iconColor ? iconColor : "#F5232D" }}>
      <CloseCircleOutlined />
      <span
        style={{ paddingLeft: "5px", color: textColor ? textColor : "#F5232D" }}
      >
        {translate(text)}
      </span>
    </span>
  );
};

export default FailLabel;
