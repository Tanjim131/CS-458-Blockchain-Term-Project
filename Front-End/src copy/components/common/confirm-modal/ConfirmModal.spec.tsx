import React from 'react';
import { shallow } from "enzyme";
import ConfirmModal from "./ConfirmModal";
import { shallowToJson } from "enzyme-to-json";

describe('ConfirmModal Component', () => {
    let wrapper: any;
    const mockFunc = jest.fn();

    const props = {
        visible : true,
        onCancel :mockFunc,
        onConfirm :mockFunc,
        children :"",
        centered : false,
        onConfirmBtnText : "Confirm",
        title : "title",
        disableConfirmBtn : false
    }
    beforeAll(() => {
        wrapper = shallow(
            <ConfirmModal
                {...props}
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

    it('Check if component exists or not and capture snapshot', () => {
        wrapper.setProps({ centered : true, disableConfirmBtn: true, onConfirmBtnText:"Confirm-text" });
        expect(wrapper).toBeTruthy();
    })
})