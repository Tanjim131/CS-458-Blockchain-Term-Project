import React from 'react';
import { shallow } from "enzyme";
import ErrorModal from "./ErrorModal";
import { shallowToJson } from "enzyme-to-json";

describe('ErrorModal Component', () => {
    let wrapper: any;
    const mockFunc = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <ErrorModal
                visible={true}
                footer="footer"
                onCancel={mockFunc}
                children={{}}
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })
})