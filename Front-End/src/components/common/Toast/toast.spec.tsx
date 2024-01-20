import React from 'react';
import { shallow } from "enzyme";
import Toast, {mapDispatchToProps} from "./toast";
import { shallowToJson } from "enzyme-to-json";

describe('SuccessModal Component', () => {
    let wrapper: any;
    const mockFunc = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <Toast.WrappedComponent
                toastMessage="message"
                showToast ={mockFunc}
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

    it("test the mapDispatchToProps", () => {
        const dispatch = jest.fn();        
        mapDispatchToProps(dispatch).showToast(true);
        expect(wrapper).toBeTruthy();
    });

})