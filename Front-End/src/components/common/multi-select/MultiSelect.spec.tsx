import React from 'react';
import { shallow } from "enzyme";
import MultiSelect from "./MultiSelect";
import { shallowToJson } from "enzyme-to-json";

describe('MultiSelect Component', () => {
    let wrapper: any;
    const mockFunc = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <MultiSelect
            children = ""
            handleChange = {mockFunc}
            className = ""
            placeholder = "select the city"
            value = "value"
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

    it("should check when the className is empty", () =>{
        wrapper.setProps({ className:"className"});
        expect(wrapper).toBeTruthy()
    })

})