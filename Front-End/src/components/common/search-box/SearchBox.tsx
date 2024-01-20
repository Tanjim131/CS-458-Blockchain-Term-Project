import React, { FC, useState } from "react";
import { Input } from "antd";

import specialCharDiscard from "../../../../utils/string/specialCharDiscard";
import specialCharNumDiscard from "../../../../utils/string/specialCharNumDiscard";
import emailString from "../../../../utils/string/emailString";
import "./SearchBox.less";

/*
 interface for Search component
*/
interface ISearchProps {
  className?: string;
  placeholder: string;
  onSearch: (data:any) => void;
  disabled?: boolean;
  value: string;
  onChange: (e:any) => void;
  onPressEnter: (e:any) => void;
  pageType?: string;
}
/**
 * This is used for search box
 *
 * @usage: <SearchBox />
 */
const SearchBox: FC<ISearchProps> = (props: ISearchProps) => {
  const { className= "", placeholder, disabled= false, onSearch, onChange,
    value, onPressEnter, pageType = "auth" } = props;

  const specialCharRejected = (value: string) => {
    if(pageType === "participantView" || pageType === "disbursementView"){
      onChange(emailString(value));
    }
    else if (pageType === "issuer") {
      onChange(specialCharNumDiscard(value));
    } else {
      onChange(specialCharDiscard(value));
    }
  };

  return (
        <Input.Search
            className={`search-box-class ${className}`}
            placeholder={placeholder}
            onSearch={onSearch}
            disabled={disabled}
            value={value}
            onChange={(e) => {specialCharRejected(e.target.value); }}
            allowClear={true}
            onPressEnter={onPressEnter}
        />
  );
};

export default SearchBox;
