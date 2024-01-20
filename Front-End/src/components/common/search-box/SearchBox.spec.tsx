import React from 'react';
import { shallow } from "enzyme";
import SearchBox from "./SearchBox";
import { shallowToJson } from "enzyme-to-json";

describe('SearchBox Component', () => {
    let wrapper: any;
    const mockFunc = jest.fn();

    beforeAll(() => {
        wrapper = shallow(
            <SearchBox
            className = ""
            placeholder = "search"
            onSearch = {mockFunc}
            disabled = {true}
            value = "value"
            onChange = {mockFunc}
            onPressEnter = {mockFunc}
            pageType = "issuer"
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

    it("should check whether the onSearch function is called", () => {
        wrapper
            .find("Search")
            .props()
            .onSearch();
        expect(mockFunc).toHaveBeenCalled();
    });

    it("should check whether the onChange function is called", () => {

        const event = {
            target : {
                value :"value"
            }
        }

        wrapper
            .find("Search")
            .props()
            .onChange(event);
        expect(mockFunc).toHaveBeenCalled();
    });

    it("should check whether the onChange function is called when pageType  is auth", () => {
        wrapper.setProps({ pageType : "auth" });
        const event = {
            target : {
                value :"value"
            }
        }

        wrapper
            .find("Search")
            .props()
            .onChange(event);
        expect(mockFunc).toHaveBeenCalled();
    });
})