import React from 'react';
import { shallow } from "enzyme";
import TablePagination from "./Pagination";
import { shallowToJson } from "enzyme-to-json";

describe('TablePagination Component', () => {
    let wrapper: any;
    const mockFunc = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <TablePagination
                currentPageNo={1}
                currentPageSize={10}
                totalRecord={100}
                onShowSizeChange={mockFunc}
                setPageNumber={mockFunc}
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

    it("should check whether the onShowSizeChange function is called", () => {
        wrapper
            .find("Pagination")
            .props()
            .onShowSizeChange();
        expect(mockFunc).toHaveBeenCalled();
    });
})