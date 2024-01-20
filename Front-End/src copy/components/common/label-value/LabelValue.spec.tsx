import React from 'react';
import { shallow } from "enzyme";
import LabelValue from "./LabelValue";
import { shallowToJson } from "enzyme-to-json";

describe('InputForm Component', () => {
    let wrapper: any;

    beforeAll(() => {
        wrapper = shallow(
            <LabelValue
            label = "label"
            value = "value"
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })
})