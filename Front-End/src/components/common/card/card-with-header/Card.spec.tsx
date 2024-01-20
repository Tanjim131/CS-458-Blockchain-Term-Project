import React from 'react';
import { shallow } from "enzyme";
import WalletCard from "./Card";
import { shallowToJson } from "enzyme-to-json";

describe('Wallet Component', () => {
    let wrapper: any;
    const mockFunc = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <WalletCard
                icon=""
                title="title"
                coinLeft={10}
                headerColorClass="color"
                showButton={true}
                handleAddFreeCoin={mockFunc}
                showViewDetails={false}
                handleViewDetails={mockFunc}
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

    it('Check the component when the showView Details is truthy', () => {
        wrapper.setProps({ showViewDetails: true });
        expect(wrapper).toBeTruthy();
    })
})