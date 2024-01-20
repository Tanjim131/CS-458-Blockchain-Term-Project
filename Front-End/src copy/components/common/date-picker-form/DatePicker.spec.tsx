import React from 'react';
import { shallow } from "enzyme";
import DatePickerForm from "./DatePickerForm";
import { shallowToJson } from "enzyme-to-json";
import { intlStub } from '../../../../utils/testUtils/intlStub';

describe('DatePickerForm Component', () => {
    let wrapper: any;

    beforeAll(() => {
        wrapper = shallow(
            <DatePickerForm.WrappedComponent
                intl={intlStub}
                formItemName="formItemNumber"
                formItemLabel="label"
                rulesMsg="message"
                required={true}
                dateFormat="1/2/2020"
                onChangeDate={jest.fn()}
                disabledDate={jest.fn()}
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

})