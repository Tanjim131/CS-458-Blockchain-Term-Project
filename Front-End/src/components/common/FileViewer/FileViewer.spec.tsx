import React from 'react';
import { shallow } from "enzyme";
import FileViewer from "./FileViewer";
import { shallowToJson } from "enzyme-to-json";

describe('FileViewer Component', () => {
    let wrapper: any;

    beforeAll(() => {
        wrapper = shallow(
            <FileViewer
                url="http://www.jsonplaceholder.pdf"
            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

    it("when the url is of .jpg", () =>{
        wrapper.setProps({ url: "http://www.jsonplaceholder.jpg"});
        expect(wrapper).toBeTruthy()
    })

    it("when the url is of .jpeg", () =>{
        wrapper.setProps({ url: "http://www.jsonplaceholder.jpeg"});
        expect(wrapper).toBeTruthy()
    })

    it("when the url is of .png", () =>{
        wrapper.setProps({ url: "http://www.jsonplaceholder.png"});
        expect(wrapper).toBeTruthy()
    })
})