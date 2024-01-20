import React, { FC } from "react";
import { Select } from "antd";

import "./multiSelect.less";

interface IMultiSelect {
  children: any;
  handleChange: (country: string[]) => void;
  className?: string;
  placeholder: string;
  value?: any;
}

const MultiSelect: FC<IMultiSelect> = (props: IMultiSelect) => {
  const { children, handleChange, className = "", placeholder, value } = props;

  return (
        <Select
            mode="multiple"
            allowClear={true}
            className={`multiselect-wrapper ${className}`}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {children}
        </Select>
  );
};

export default MultiSelect;
