import React, { FC } from "react";
import { Form, DatePicker } from "antd";


/**
 * This is used for DatePickerForm
 *
 * @usage: <DatePickerForm formItemName={string} formItemLabel={string} rulesMsg={string} required={boolean} dateFormat="DD/MM/YYYY" />
 */
const DatePickerForm = (props) => {
  const { intl, formItemName, formItemLabel, rulesMsg = intl.formatMessage({ id: "field_required" }), required = true, dateFormat = "DD/MM/YYYY", disabledDate, onChangeDate } = props;

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
      >
        <DatePicker disabledDate={disabledDate} onChange={onChangeDate} allowClear={false} format={dateFormat}/>
      </Form.Item>
    </>
  );
};

export default DatePickerForm;
