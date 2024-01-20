import React from 'react';
import { shallow } from "enzyme";
import UploadFile from "./UploadFile";
import { shallowToJson } from "enzyme-to-json";
import { intlStub } from '../../../../utils/testUtils/intlStub';

describe('UploadFile Component', () => {
    let wrapper: any;

    const fileDetail = {
        fileSize : 123,
        fileName : "name",
        fileExtension : ".pdf",
        thumbnailUrl : "https://jsonplaceholder.com"
    }
    beforeAll(() => {
        wrapper = shallow(
            <UploadFile.WrappedComponent
            intl = {intlStub}
            fileRequired = "required"
            isClear = {true}
            fileDetails = {fileDetail}
            disabled = {true}
            onFileUpload = {jest.fn()}
            onRemoveFile = {jest.fn()}
                      />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

})