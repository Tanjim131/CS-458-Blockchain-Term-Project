import React from 'react';
import { shallow } from "enzyme";
import InputForm from "./InputForm";
import { shallowToJson } from "enzyme-to-json";

describe('InputForm Component', () => {
    let wrapper: any;

    beforeAll(() => {
        wrapper = shallow(
            <InputForm
                formItemName="formItemName"
                formItemLabel="formItemLabel"
                rulesMsg="ruleMsg"
                required={true}
                tooltipTitle="title"
                placeholderText="placeHolderText"
                clearField={true}
                allowedRegExp="regex"
                className="className"
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

    it("should check when the className is empty", () =>{
        wrapper.setProps({ rulesMsg  : "Fields required", required: true, clearField: false, allowedRegExp:"", className:""});
        expect(wrapper).toBeTruthy()
    })

})