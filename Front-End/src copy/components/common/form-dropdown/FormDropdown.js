import React, { FC } from "react";
import { Form, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import "./FormDropdown.less";


/**
 * This is used for FormDropdown
 *
 * @usage: <FormDropdown formItemName={string} formItemLabel={string} rulesMsg={string} required={boolean} tooltipTitle={string} placeholderText={string} onChangeEvent={function} clearField={boolean} optionList={array} />
 */
const FormDropdown  = (props) => {
  const { intl, formItemName, formItemLabel, rulesMsg = intl.formatMessage({ id: "upload_file_error" }), required = true, tooltipTitle, placeholderText, onChangeEvent, clearField = false, optionList = [] } = props;

  return (
    <>
      <Form.Item
        name={formItemName}
        label={formItemLabel}
        className="add-document-form-field"
        rules={[
          {
            required,
            message: rulesMsg,
          },
        ]}
        tooltip={tooltipTitle ? {
          title: tooltipTitle,
          icon: <InfoCircleOutlined />,
          placement: "rightTop",
          autoAdjustOverflow: true,
          overlayClassName: "tooltip-add-document",
        } : ""}
      >
        <Select
          placeholder={placeholderText}
          onChange={onChangeEvent}
          allowClear={clearField}
        >
          {(optionList && optionList.length > 0 ) &&
            optionList.map((documt: any, index: number) => (
              <Select.Option key={index} value={documt}>
                {documt}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default FormDropdown;
