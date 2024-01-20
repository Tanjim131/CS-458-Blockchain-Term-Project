import React, { FC } from "react";
import { Form, Input } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import "./InputForm.less";

/**
 * This is used for InputForm
 *
 * @usage: <InputForm formItemName={string} formItemLabel={string} rulesMsg={string} required={boolean} tooltipTitle={string} placeholderText={string} />
 */
const InputForm = (props) => {
  const {
    className,
    formItemName,
    formItemLabel,
    rulesMsg = "Fields required",
    required = true,
    tooltipTitle,
    placeholderText,
    clearField = false,
    allowedRegExp = "",
    dependencies,
    initialValue,
    type,
    autocomplete
  } = props;

  return (
    <>
      <Form.Item
        name={formItemName}
        label={formItemLabel}
        className={className ? className : "add-document-form-field"}
        initialValue={initialValue}
        rules={[
          {
            required,
            pattern: new RegExp(allowedRegExp, "i"),
            message: rulesMsg,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (dependencies) {
                if (!value || getFieldValue("accountNumber") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two account number that you entered do not match!",
                );
              }
              return Promise.resolve();

            },
          }),
        ]}
        tooltip={
          tooltipTitle
            ? {
              title: tooltipTitle,
              icon: <InfoCircleOutlined />,
              placement: "rightTop",
              overlayClassName: "tooltip-add-document",
            }
            : ""
        }
        dependencies={dependencies}
      >
        <Input allowClear={clearField} placeholder={placeholderText} type={type} autoComplete={autocomplete}/>
      </Form.Item>
    </>
  );
};

export default InputForm;
