
import React from 'react';
import { shallow } from "enzyme";
import Button from "./button";
import { shallowToJson } from "enzyme-to-json";

describe('Button Component', () => {
    let wrapper: any;

    enum ButtonType {
        PRIMARY,
        SECONDARY,
        LINK,
        NORMAL,
    }

    beforeAll(() => {
        wrapper = shallow(
            <Button
                children="children"
                className=""
                type={ButtonType.PRIMARY}
                onClick={jest.fn()}
                disabled={false}
                htmlType="string"
                icon="icon"
                href="https://placeholder.com"
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

    it('it should check for the props', () => {
    let wrapperShallow = shallow(
            <Button
                children="children"
                className="className"
                type={ButtonType.PRIMARY}
                onClick={jest.fn()}
                disabled={true}
                htmlType="string"
                icon="icon"
                href="https://placeholder.com"
            />
        )
    expect(wrapperShallow).toBeTruthy()
    })
})


