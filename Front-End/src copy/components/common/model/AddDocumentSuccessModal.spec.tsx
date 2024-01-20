import React from 'react';
import { shallow } from "enzyme";
import AddDocumentSuccessModal from "./AddDocumentSuccessModal";
import { shallowToJson } from "enzyme-to-json";
import { intlStub } from '../../../../utils/testUtils/intlStub';

describe('AddDocumentSuccessModal Component', () => {
    let wrapper: any;

    beforeAll(() => {
        wrapper = shallow(
            <AddDocumentSuccessModal.WrappedComponent
                
            intl = {intlStub}
            children = {{}}
            isModalVisible = {true}
            modalTitle = "title"
            okBtnText = "ok"
            cancelBtnText = "cancel"
            modalContent = "cotent"
            handleOk = {jest.fn()}
            handleCancel= {jest.fn()}
            handleInitiate= {jest.fn()}
            initiateBtn = {true}
            initiateBtnText = "intiate"            />
        )
    })

    it('Check if component exists or not and capture snapshot', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    })

})