import React from 'react';
import { shallow } from "enzyme";
import CountCard from "./CountCard";
import { shallowToJson } from "enzyme-to-json";

describe('CountCard Component', () => {
    let wrapper: any;
    const mockFunc = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <CountCard
            title = "title"
            coinsLeft = {2}
            timeLeft = {12345}
            timeFormat = "dd/mm/yy"
            ringColor = "color"
            handleViewDetails = {mockFunc}
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })
})