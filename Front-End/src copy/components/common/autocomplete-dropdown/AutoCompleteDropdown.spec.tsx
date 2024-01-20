import React from 'react';
import { shallow } from "enzyme";
import AutoCompleteDropdown from "./AutoCompleteDropdown";
import { shallowToJson } from "enzyme-to-json";
import { intlStub } from '../../../../utils/testUtils/intlStub';

describe('AutoCompleteDropdown Component', () => {
    let wrapper: any;
    const mockFunc = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <AutoCompleteDropdown.WrappedComponent
            intl = {intlStub}
            formItemName = "name"
            formItemLabel = "label"
            rulesMsg = "message"
            required = {true}
            tooltipTitle = "anytitle"
            placeholderText = "any text"
            onChangeEvent = {mockFunc}
            clearField = {true}
            optionList = {[]}
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

})