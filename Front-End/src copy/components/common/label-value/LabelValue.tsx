import React, { FC } from "react";
import "./LabelValue.less";

/**
 * interface for Label Value component
 */
interface ILabelValue {
  label: string;
  value: string;
}

/**
 * component shown the label value.
 *
 * @usage: <LabelValue />
 */
const LabelValue: FC<ILabelValue> = (props: ILabelValue) => {
  const { label, value } = props;

  return (
    <span className="label-container">
      <p className="label">{label}</p>
      <p className="value" data-value={value}>{value}</p>
    </span>
  );
};

export default LabelValue;
