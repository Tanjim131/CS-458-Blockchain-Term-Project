import React from 'react';
import { shallow } from "enzyme";
import DiscardButton from "./discardButton";
import { shallowToJson } from "enzyme-to-json";

describe('DiscardButton Component', () => {
    let wrapper: any;
    const mockFunc = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <DiscardButton
            onClickEvent = {mockFunc}
            btnText = "Discard"
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

    it("should check for the click event", () => {
        wrapper.find(".btn-discard-default").simulate("click");
        expect(wrapper).toBeTruthy();
    })

})