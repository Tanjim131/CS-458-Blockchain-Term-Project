import React from "react";
import { shallow } from "enzyme";
import RequestVerifyOTP from "./VerifyOTP";
import { shallowToJson } from "enzyme-to-json";
import { intlStub } from "../../../../utils/testUtils/intlStub";

describe("RequestVerifyOTP Component", () => {
  let wrapper: any;

  const userProfile = {
    id: "1234567",
    displayName: "displayName",
    name: "name",
    emailId: "email@gmail.com",
    mobileNumber: "9990628496",
    role: [],
    token: "1234567",
    designation: "administrator",
  };

  beforeAll(() => {
    wrapper = shallow(
            <RequestVerifyOTP.WrappedComponent
                isMobileVerifySuccess={true}
                isEmailVerifySuccess={true}
                isMobileVerifyError={true}
                isEmailVerifyError={true}
                userProfile={userProfile}
                onFinish={jest.fn()}
                sendOTP={jest.fn()}
                validateOTP={jest.fn()}
                resetRequestAction={jest.fn()}
                mobileNumber="9999999"
                emailId="email@gmail.com"
                eventId="1234567"
            />,
        );
  });

  it("Check if component exists or not and capture snapshot", () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

});
