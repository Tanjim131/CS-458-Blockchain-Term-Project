import React from 'react';
import { shallow } from "enzyme";
import SuccessLabel from "./SuccessLabel";
import { shallowToJson } from "enzyme-to-json";

describe('SuccessLabel Component', () => {
    let wrapper: any;
    const mockFunc = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <SuccessLabel
            text ="text"
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

    it("should check whether the text color is present", () => {
        wrapper.setProps({ textColor : "52c41a" });
        expect(wrapper).toBeTruthy()
    });

})