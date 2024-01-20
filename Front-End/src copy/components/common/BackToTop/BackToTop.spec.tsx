import React from 'react';
import { shallow } from "enzyme";
import BackToTop from "./BackToTop";
import { shallowToJson } from "enzyme-to-json";
import { intlStub } from '../../../../utils/testUtils/intlStub';

describe('BackToTop Component', () => {
    let wrapper: any;

    beforeAll(() => {
        wrapper = shallow(
            <BackToTop
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

})