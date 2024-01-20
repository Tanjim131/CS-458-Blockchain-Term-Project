import React from 'react';
import { shallow } from "enzyme";
import FormDropdown from "./FormDropdown";
import { shallowToJson } from "enzyme-to-json";
import { intlStub } from '../../../../utils/testUtils/intlStub';

describe('FormDropdown Component', () => {
    let wrapper: any;

    beforeAll(() => {
        wrapper = shallow(
            <FormDropdown.WrappedComponent
            intl = {intlStub}
            formItemName = "name"
            formItemLabel = "label"
            rulesMsg = "message"
            required = {true}
            tooltipTitle = "title"
            placeholderText = "placeholder"
            onChangeEvent  = {jest.fn()}
            clearField = {true}
            optionList = {[]}
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

})