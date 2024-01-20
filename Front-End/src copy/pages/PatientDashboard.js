import React, { useState, FC, useRef, useEffect } from "react";
import axios from "axios";

import Web3 from 'web3';
import { message } from 'antd';
import { Form } from "antd";
import {
  InfoCircleOutlined,
} from "@ant-design/icons";
import BreadCrumb from "../components/BreadCrumb";

import { contractABI, contractAddress } from "../pages/Data"
import Button from "../components/common/button/Button";


/**
 * This is used for upload file
 *
 * @usage: <PatientDashboard onFileUpload={} onRemoveFile={} fileUploadError={string} uploadLabel={string} uploadInfo={string} uploadInformation1={string} uploadInformation2={string} uploadInformation3={string} />
 */
const PatientDashboard = (props) => {
  const {
  } = props;
  const [pendingList, setPendingList] = useState(["abc"]);
  const [authorizedList, setAuthorizedList] = useState([]);

  useEffect(()=>{
    syncCall();
  },[])


  const syncCall = async() => {
    const web3 = new Web3('https://sepolia.infura.io/v3/8924bca36b3d46ee8eb528306b5f1dfc');
    const newContract = new web3.eth.Contract(contractABI, contractAddress);
    const result1 = await newContract.methods.getPendingUserList("0x47056Cd626f5A2036fe1c7683498244cA9187684").call();
    if(result1){
      // message.success('Action completed successfully!');
      // setPendingList(result1);
    } else {
      message.error('Pending List fetch failed');
    }
    console.log("result1", result1)

    const result2 = await newContract.methods.getAuthUserList("0x47056Cd626f5A2036fe1c7683498244cA9187684").call();
    if(result2){
      // message.success('Action completed successfully!');
      // setAuthorizedList(result2);
    } else {
      message.error('Authozied List fetch failed');
    }
    console.log("result2", result2)
  }


  const authorizeUser = async(val) => {
    console.log("data", val)

    const web3 = new Web3('https://sepolia.infura.io/v3/8924bca36b3d46ee8eb528306b5f1dfc');
    const newContract = new web3.eth.Contract(contractABI, contractAddress);
    const result = await newContract.methods.denyUser("0x47056Cd626f5A2036fe1c7683498244cA9187684", "0x47056Cd626f5A2036fe1c7683498244cA9187684").call();
    // if(result){
    //   message.success('Permission denyed successfully!');
    // } else {
    //   message.error('Permisssion Denied');
    // }
    message.success('Permission authorized successfully!');
    setAuthorizedList(["Doctor Strange"]);
    setPendingList([])
    console.log("result", result)
  }

  
  const denyUser = async(val) => {
    console.log("data", val)

    const web3 = new Web3('https://sepolia.infura.io/v3/8924bca36b3d46ee8eb528306b5f1dfc');
    const newContract = new web3.eth.Contract(contractABI, contractAddress);
    const result = await newContract.methods.denyUser("0x47056Cd626f5A2036fe1c7683498244cA9187684", "0x47056Cd626f5A2036fe1c7683498244cA9187684").call();
    if(result){
      message.success('Permission denyed successfully!');
    } else {
      message.error('Permisssion Denied');
    }
    console.log("result", result)
  }


  const revokeAccess = async(val) => {
    console.log("data", val)

    const web3 = new Web3('https://sepolia.infura.io/v3/8924bca36b3d46ee8eb528306b5f1dfc');
    const newContract = new web3.eth.Contract(contractABI, contractAddress);
    const result = await newContract.methods.revokeAccess("0x47056Cd626f5A2036fe1c7683498244cA9187684", "0x47056Cd626f5A2036fe1c7683498244cA9187684").call();
    if(result){
      message.success('Permission revoked successfully!');
    } else {
      message.error('Permisssion Denied');
    }
    console.log("result", result)
  }

  return (
    <>
    <div className="container-xxl">
    <BreadCrumb title="Patient Upload Document" />
      <Form.Item
        name="docFile"
        // label={translate("upload_soft_copy_label")}
        className="add-document-form-field upload-document-field"
        tooltip={{
          // title: translate("upload_soft_copy_info"),
          icon: <InfoCircleOutlined />,
          placement: "right",
          overlayClassName: "tooltip-add-document",
        }}
      >
        <>
          <div className="syc-wrap">
            <span className="make-bold"> Pending Request(s) </span>
            <span>
              <Button className="upload-document-submit-button inline-dip"  htmlType="submit" onClick={syncCall}>
                  Sync
              </Button>
            </span>
          </div>
          <>{pendingList.map((ele, index)=>
            <div key={index}>
              <div>
                <span className="mr-2">
                  Doctor Strange
                </span>
                <Button className="upload-document-submit-button abcd"  htmlType="submit" onClick={()=>authorizeUser(ele)}>
                    Approve Permisssion
                </Button>
                <Button className="upload-document-submit-button"  htmlType="submit" onClick={()=>denyUser(ele)}>
                    Deny Permisssion
                </Button>
              </div>
            </div>)}
          </>

          <br/>
          <br/>
          <br/>
          
          <div className="syc-wrap">
            <span className="make-bold"> Authorized Request(s) </span> 
            <span>
              <Button className="upload-document-submit-button inline-dip"  htmlType="submit" onClick={syncCall}>
                  Sync
              </Button>
            </span>
          </div>
          <>{authorizedList.map((ele, index)=>
            <div key={index}>
              <div>
                <span className="mr-2">
                  Iron Man
                </span>
                <Button className="upload-document-submit-button"  htmlType="submit" onClick={()=>revokeAccess(ele)}>
                    Revoke Permisssion
                </Button>
              </div>
            </div>)}
          </>

        </>
      </Form.Item>
      </div>
    </>
  );
};

export default PatientDashboard;
