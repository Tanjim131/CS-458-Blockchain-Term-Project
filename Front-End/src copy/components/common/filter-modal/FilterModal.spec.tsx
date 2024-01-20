import React from 'react';
import { shallow } from "enzyme";
import FilterModal from "./FilterModal";
import { shallowToJson } from "enzyme-to-json";

describe('FilterModal Component', () => {
    let wrapper: any;
    const mockFunc = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <FilterModal
                visible={true}
                onCancel={mockFunc}
                children=""
                buttonDisabled={true}
                showFilterModal={mockFunc}
                onFilterApply={mockFunc}
                clearFilterButton={mockFunc}
                clearButtonVisible={true}
                filterApplied={true}
                className="className"
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

    it("when clear filter button is false", () =>{
        wrapper.setProps({ clearButtonVisible : false, className: ""});
        expect(wrapper).toBeTruthy()
    })

})