import React, { FC, useEffect, useState } from "react";
import { Alert } from "antd";
import { connect } from "react-redux";
import { showToast } from "../../../../redux/common/action";

/**
 * props for Toast
 */
interface IToastProps {
  toastMessage: string;
  showToast: (show: boolean) => {};
}

/**
 * component for Toast
 * <Toast toastMessage={string}/>
 * @param props
 */
const Toast: FC<IToastProps> = (props: IToastProps) => {
  const { toastMessage, showToast } = props;
  const [showToastMessage, setShowToastMessage] = useState(true);

  /**
   * function for calling the "showToast" action
   * & state of the toastMesage
   */
  function toastActionFunction() {
    setShowToastMessage(false);
    showToast(false);
  }

  useEffect(() => {
    setTimeout(() => toastActionFunction(), 3000);
  }, []);

  return (
    <>
      {showToastMessage && <Alert
        message={toastMessage}
        type="info"
        showIcon={true}
        closable={true}
      />}
    </>
  );
};

export function mapDispatchToProps(dispatch: any) {
  return {
    showToast: (show: boolean) => dispatch(showToast(show)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Toast);
