import React, { FC } from "react";
import { Form, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { injectIntl, IntlShape } from "react-intl";

import "./AutoCompleteDropdown.less";

/**
 * Interface for programme details.
 */
interface IAutoCompleteDropdown {
  intl: IntlShape;
  formItemName: string;
  formItemLabel: string;
  rulesMsg: string;
  required: boolean;
  tooltipTitle?: string;
  placeholderText: string;
  onChangeEvent?: (val: string) => void;
  clearField: boolean;
  optionList: any;
}

/**
 * This is used for AutoCompleteDropdown
 *
 * @usage: <AutoCompleteDropdown formItemName={string} formItemLabel={string} rulesMsg={string} required={boolean} tooltipTitle={string} placeholderText={string} onChangeEvent={function} clearField={boolean} optionList={array} />
 */
const AutoCompleteDropdown: FC<IAutoCompleteDropdown> = (props: IAutoCompleteDropdown) => {
  const { intl, formItemName, formItemLabel, rulesMsg = intl.formatMessage({ id: "upload_file_error" }), required = true, tooltipTitle, placeholderText, onChangeEvent, clearField = false, optionList = [] } = props;

  return (
    <>
      <Form.Item
        name={formItemName}
        label={formItemLabel}
        className="auto-complete-dropdwon"
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
          showSearch={true}
          placeholder={placeholderText}
          optionFilterProp="children"
          allowClear={clearField}
          onChange={onChangeEvent}
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {(optionList && optionList.length > 0 ) &&
            optionList?.map((documt: any) => (
              <Select.Option key={documt.id} value={documt.id}>
                {documt.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default injectIntl(AutoCompleteDropdown);
