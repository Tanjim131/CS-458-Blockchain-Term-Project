import { Divider, Select, Spin } from "antd";
import { SelectProps } from "antd/es/select";
import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import { drupalAxios } from "../../../../redux/axios";
import { debounce } from "../../../../utils/object/debounce";
import "./userSelect.less";
import UserIcon from "../user-icon/UserIcon";
import { UserRoles } from "../../../../utils/common-constants/Constants";

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, "options" | "children"> {
  fetchOptions: (search: string, selectedValue: any) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({ fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps) {
  if (props.className === "user-select") {
    delete props.mode;
    props = { ...props, showSearch: true };
  } else {
    props = { ...props, mode: "multiple" };
  }

  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState<ValueType[]>([]);
  const fetchRef = React.useRef(0);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value, props.value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select<ValueType>
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
      value={props.value}
    />
  );
}

// Usage of DebounceSelect
interface UserValue {
  label: string;
  value: string;
}

let sessionObj: any = null;
let userTypes: any = null;

async function fetchUserList(
  username: string,
  selectedValue: any
): Promise<UserValue[]> {

  function getQuery(){
    let url = `api/rest/search-users?name=${username}`;
    if(!userTypes){
      return url;
    }
    userTypes.map((type:string)=>{
      url+= `&roles[]=${type}`
    });
    return url;
  }

  return drupalAxios
    .get(
        getQuery(),
      {
        headers: {
          Authorization: `Bearer ${sessionObj?.user?.access_token}`,
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
        },
      }
    )
    .then((response) => response?.data?.data)
    .then((response) => {
      if (selectedValue instanceof Array && selectedValue?.[0]?.value) {
        selectedValue = selectedValue
          ? selectedValue?.map((val: any) => val?.value)
          : [];
        return response?.filter(
          (val: any) => !selectedValue?.includes(val.name)
        );
      }
      return response;
    })
    .then((data: any) =>
      data.map((user: any) => ({
        label: (
          <div className="user-select-wrapper">
            <div className="border">
              <span>
                <UserIcon role={user?.roles_target_id} /> &nbsp;{" "}
                {/* TODO: Need to add icon for all types of roles */}
                {user?.field_first_name} {user?.field_last_name}
              </span>
              <br />
              <span className="color">{user?.name}</span>
            </div>
          </div>
        ),
        value: `${user.uuid}~${user.name}~${user.roles_target_id}~${user?.field_first_name} ${user?.field_last_name}`,
      }))
    );
}

const UserSelect = (props: any) => {
  const { onChange, placeholder, mode, disabled, items, userType } = props;
  const [value, setValue] = useState<any>(
    mode === "multiple" ? (items ? items : []) : items ? items : {}
  );
  const [session, loading] = useSession();
  sessionObj = session;
  userTypes = userType;

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <DebounceSelect
      className={mode === "multiple" ? "user-select-multiple" : "user-select"}
      allowClear={true}
      disabled={disabled}
      mode={"multiple"}
      value={value}
      placeholder={placeholder}
      fetchOptions={fetchUserList}
      onChange={(newValue) => {
        setValue(newValue);
        return newValue;
      }}
      style={{ width: "100%" }}
    />
  );
};

export default UserSelect;
