import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FieldTimeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { IUserProfile } from "../../../../config/user/userData";
import translate from "../../../../i18n/translate";
import {
  resetRequestAction,
  sendOTP,
  validateOTP,
} from "../../../../redux/cvs/authentication-requests/action";
import {
  ISendOTPPayload,
  IValidateOTPPayload,
  OTPType,
} from "../../../../redux/cvs/authentication-requests/authenticationRequests.interface";
import Button, { ButtonType } from "../button/Button";

import "./verifyotp.less";

/**
 * interface for verify request otp component
 */
interface IVerifyOTPProps {
  isMobileVerifySuccess: boolean;
  isEmailVerifySuccess: boolean;
  isMobileVerifyError: boolean;
  isEmailVerifyError: boolean;
  userProfile: IUserProfile;
  onFinish: (isSuccess: boolean) => void;
  sendOTP: (payload: ISendOTPPayload) => void;
  validateOTP: (payload: IValidateOTPPayload) => void;
  resetRequestAction: (isMobile?: boolean) => void;

  mobileNumber?: string;
  emailId?: string;
  eventId: string;
}

/**
 * component verify the user otp.
 *
 * @usage: <RequestVerifyOTP />
 */
const RequestVerifyOTP: FC<IVerifyOTPProps> = (props: IVerifyOTPProps) => {
  const {
    sendOTP,
    validateOTP,
    resetRequestAction,
    onFinish,
    isEmailVerifySuccess,
    isMobileVerifySuccess,
    isMobileVerifyError,
    isEmailVerifyError,
    userProfile,
    mobileNumber,
    emailId,
    eventId,
  } = props;
  const [mobileOTP, setMobileOTP] = useState("");
  const [emailOTP, setEmailOTP] = useState("");
  const [isResendOTPVisible, showResendOTP] = useState(false);
  const [timer, setTimer] = useState(Date.now() + 180000);

  useEffect(() => {
    resetRequestAction();
    onSendOTP();
  }, []);

  const onSendOTP = () => {
    /** Sending the Email OTP */
    if (emailId) {
      sendOTP({
        recipient: [emailId],
        event: eventId,
        notificationType: OTPType.EMAIL,
        isOTP: true,
      });
    }

    /** Sending the Mobile OTP */
    if (mobileNumber) {
      sendOTP({
        mobile: mobileNumber,
        event: eventId,
        notificationType: OTPType.SMS,
        isOTP: true,
      });
    }
  };

  useEffect(() => {
    const isSuccess: boolean = (isMobileVerifySuccess || isEmailVerifySuccess);
    onFinish(isSuccess);
  }, [
    isEmailVerifySuccess,
    isMobileVerifySuccess,
    isEmailVerifyError,
    isMobileVerifyError,
  ]);

  const resendOTP = () => {
    onSendOTP();
    setMobileOTP("");
    setEmailOTP("");
    showResendOTP(false);
    setTimer(Date.now() + 180000);
    resetRequestAction();
  };

  const changeMobileOTP = (e: any) => {
    const otp: string = e.target.value;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(+otp) && reg.test(otp)) || otp === "" || otp === "-") {
      if (otp.length <= 6) {
        setMobileOTP(otp);
        if (otp.length === 6) {
          resetRequestAction(true);
          e.target.blur();
          validateOTP({
            mobile: mobileNumber,
            event: eventId,
            notificationType: OTPType.SMS,
            otp: +otp,
          });
        }
      }
    }
  };

  const changeEmailOTP = (e: any) => {
    const otp: string = e.target.value;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(+otp) && reg.test(otp)) || otp === "" || otp === "-") {
      if (otp.length <= 6) {
        setEmailOTP(otp);
        if (otp.length === 6) {
          resetRequestAction(false);
          e.target.blur();
          validateOTP({
            recipient: emailId ? [emailId] : [],
            event: eventId,
            notificationType: OTPType.EMAIL,
            otp: +otp,
          });
        }
      }
    }
  };

  return (
    <div className="otp-container">
      {mobileNumber && (
        <Row>
          <Col style={{ fontWeight: "bold" }} span={24}>
            {translate("mobile_otp_verification")}
          </Col>
          <Col className="opt-label" span={24}>
            {translate("otp_sent_on")} {userProfile?.mobileNumber}
          </Col>
          <Col style={{ paddingTop: "5px", paddingBottom: "5px" }} span={24}>
            <Input
              disabled={isMobileVerifySuccess || isEmailVerifySuccess}
              className={`otp ${
                isMobileVerifySuccess
                  ? "otp-success"
                  : isMobileVerifyError
                  ? "otp-error"
                  : ""
              }`}
              value={mobileOTP}
              onChange={changeMobileOTP}
            />
          </Col>
          <Col span={12}>
            {mobileOTP.length === 6 &&
              !isMobileVerifySuccess &&
              !isMobileVerifyError && (
                <>
                  <LoadingOutlined />
                  <span style={{ paddingLeft: "5px" }}>
                    {translate("verifying_otp")}
                  </span>
                </>
              )}
            {isMobileVerifySuccess && (
              <span className="otp-verified-success">
                <CheckCircleOutlined />
                <span style={{ paddingLeft: "5px" }}>
                  {translate("otp_verified")}
                </span>
              </span>
            )}
            {isMobileVerifyError && (
              <span className="otp-verified-error">
                <CloseCircleOutlined />
                <span style={{ paddingLeft: "5px" }}>
                  {translate("incorrect_otp_please_try_again")}
                </span>
              </span>
            )}
          </Col>
        </Row>
      )}
      {emailId && (
        <Row>
          <Col
            style={{
              fontWeight: "bold",
              paddingTop: "15px",
              paddingBottom: "5px",
            }}
            span={24}
          >
            {translate("email_otp_verification")}
          </Col>
          <Col className="opt-label" span={24}>
            {translate("otp_sent_on")} {emailId}
          </Col>
          <Col style={{ paddingTop: "5px", paddingBottom: "5px" }} span={24}>
            <Input
              disabled={isEmailVerifySuccess || isMobileVerifySuccess}
              className={`otp ${
                isEmailVerifySuccess
                  ? "otp-success"
                  : isEmailVerifyError
                  ? "otp-error"
                  : ""
              }`}
              value={emailOTP}
              onChange={changeEmailOTP}
            />
          </Col>
          <Col span={12}>
            {emailOTP.length === 6 &&
              !isEmailVerifySuccess &&
              !isEmailVerifyError && (
                <>
                  <LoadingOutlined />
                  <span style={{ paddingLeft: "5px" }}>
                    {translate("verifying_otp")}
                  </span>
                </>
              )}
            {isEmailVerifySuccess && (
              <span className="otp-verified-success">
                <CheckCircleOutlined />
                <span style={{ paddingLeft: "5px" }}>
                  {translate("otp_verified")}
                </span>
              </span>
            )}
            {isEmailVerifyError && (
              <span className="otp-verified-error">
                <CloseCircleOutlined />
                <span style={{ paddingLeft: "5px" }}>
                  {translate("incorrect_otp_please_try_again")}
                </span>
              </span>
            )}
          </Col>
        </Row>
      )}
      {!(
        (isMobileVerifySuccess || isEmailVerifySuccess)
      ) && (
        <Row>
          <Col style={{ paddingTop: "20px", paddingBottom: "5px" }}>
            {!isResendOTPVisible && (
              <Countdown
                className="timer-label"
                prefix={translate("lbl_time_remaining_otp", {
                  icon: <FieldTimeOutlined />,
                })}
                suffix={translate("lbl_min")}
                value={timer}
                format="mm:ss"
                onFinish={() => showResendOTP(true)}
              />
            )}
            {isResendOTPVisible && (
              <Button
                type={ButtonType.LINK}
                className="resend-otp"
                onClick={resendOTP}
              >
                {translate("resend_otp")}
              </Button>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

export const mapStateToProps = (state: any) => {
  return {
    isMobileVerifySuccess: state.authenticationRequests.isMobileVerifySuccess,
    isEmailVerifySuccess: state.authenticationRequests.isEmailVerifySuccess,
    isMobileVerifyError: state.authenticationRequests.isMobileVerifyError,
    isEmailVerifyError: state.authenticationRequests.isEmailVerifyError,
    userProfile: state.Common.userProfile,
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    sendOTP: (payload: ISendOTPPayload) => dispatch(sendOTP(payload)),
    validateOTP: (payload: IValidateOTPPayload) =>
      dispatch(validateOTP(payload)),
    resetRequestAction: (isMobile?: boolean) => dispatch(resetRequestAction(isMobile)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestVerifyOTP);
