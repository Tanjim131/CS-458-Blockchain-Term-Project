import { Divider, message, Select, Spin } from "antd";
import { SelectProps } from "antd/es/select";
import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import { amazonAxios } from "../../../../redux/axios";
import { debounce } from "../../../../utils/object/debounce";
import "./programSelect.less";
import UserIcon from '../user-icon/UserIcon';
import config from "../../../../config/aws/aws.config";
import { ProgramStatus } from "../../../../utils/common-constants/Constants";

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, "options" | "children"> {
  fetchOptions: (search: string,selectedValue: any) => Promise<ValueType[]>;
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
      fetchOptions(value,props.value).then((newOptions) => {
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

async function fetchUserList(searchKey: string,selectedValue:any): Promise<UserValue[]> {
  console.log('searchKey', searchKey)
  const filter = {
    title: searchKey,
    orderBy: "",
    // orderByAsc: awaitingSort.orderByAsc,
    pageIndex: 0,
    // pageSize: 10,
    status: ProgramStatus.DRAFT,
    isComplete: true
  }
  return amazonAxios
    .post(`${config.REWARD_BASE_URL}/api/program/search`,filter)
    .then((response) => {console.log(response?.data); return response?.data?.programs})
    .then((data: any) =>
      data.map((program: any) => ({
        label: (
          <>
            <div style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.15)" }}>
              <span>
                {program?.title}
              </span>
              <br />
              <span style={{ color: "#B8B8B8" }}>{`${program?.type} - ${program?.id}`}</span>
            </div>
          </>
        ),
        value: `${program?.budget?.allocated}~${program?.wallet?.walletId}~${program?.title}~${program?.id}`,
      }))
    ).catch(e=>{
      message.error("Searched Failed!");
    });
}

const ProgramSelect = (props: any) => {
  const { onChange, placeholder, mode, disabled, items } = props;
  const [value, setValue] = useState<any>(
    mode === "multiple" ? (items ? items : []) : items ? items : {}
  );
  const [session, loading] = useSession();
  sessionObj = session;

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

export default ProgramSelect;
