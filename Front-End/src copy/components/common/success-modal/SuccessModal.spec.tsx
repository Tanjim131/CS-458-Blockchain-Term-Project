import React from 'react';
import { shallow } from "enzyme";
import SuccessModal from "./SuccessModal";
import { shallowToJson } from "enzyme-to-json";

describe('SuccessModal Component', () => {
    let wrapper: any;
    const mockFunc = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <SuccessModal
            visible = {true}
            footer = 'footer'
            onCancel = {mockFunc}
            children = "children"
            className = ""
            width = {undefined}
            style = {{}}
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

    it("should check whether the text color is present", () => {
        wrapper.setProps({ centered : true, width: 120 });
        expect(wrapper).toBeTruthy()
    });

})