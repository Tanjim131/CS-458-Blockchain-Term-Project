import React, { useState } from 'react';
import { message } from 'antd';
import axios from "axios";

import Web3 from 'web3';
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
// import FormDropdown from "../../common/form-dropdown/FormDropdown";
import FormDropdown from "../components/common/form-dropdown/FormDropdown";
import { Form } from "antd";
import Button from "../components/common/button/Button";
import InputForm from "../components/common/input-form/InputForm";

import { contractABI, contractAddress } from "../pages/Data"

function Contact() {

  const [requestList, setRequestList] = useState([]);
  const [result, setResult] = useState(null);
  const [patientList, setPatientList] = useState(["adfd"]);
  const [result1, setResult1] = useState("res");


  const [form] = Form.useForm();
  const formRef = React.createRef();


  const getPatientList = async () => {
    const web3 = new Web3('https://sepolia.infura.io/v3/8924bca36b3d46ee8eb528306b5f1dfc');
    const newContract = new web3.eth.Contract(contractABI, contractAddress);
    const result = await newContract.methods.getAllPatientList().call();
    if(result){
      // message.success('Action completed successfully!');
      setPatientList(result);
      // downloadFile();
    } else {
      message.error('Get Patient List Failed');
    }
    console.log("result", result)
  }

  const requestPatient = async () => {
    // const web3 = new Web3('https://sepolia.infura.io/v3/8924bca36b3d46ee8eb528306b5f1dfc');
    // const newContract = new web3.eth.Contract(contractABI, contractAddress);
    // const result = await newContract.methods.getAllPatientList().call();
    // if(result){
    //   // message.success('Action completed successfully!');
    //   setPatientList(result);
    //   // downloadFile();
    // } else {
    //   message.error('Get Patient List Failed');
    // }
    setRequestList(["Medical Record"]);
    message.success('Action completed successfully!');
    console.log("result", result)
  }


  const handleClick = async (file) => {
    console.log("file", file)
    const form = new FormData();
    form.append("patientWalletAddress", file.patientWalletAddress);
    form.append("practitionerPublicKey", file.practitionerPublicKey);
    form.append("patientPublicKey", file.patientPublicKey);

    try{
      axios
      .post("https://a93f-129-19-63-118.ngrok-free.app/api/v1/file/retrieve/", form, {  headers: { "Content-Type": "multipart/form-data", }, })
      .then((response) => {
        // console.log("sucessfully uploaded",response.data);
        // alert(JSON.stringify(response.data));
        setResult1(response.data);
        // message.success('Upload completed successfully!');
      })
      .catch((error) => {
        console.error("error", error);
      })
    }
    catch(e) {
      console.log("error in upload axios call", e)
    }
  };


  // const handleClick = async(val) => {
  //   console.log("data", val)

  //   const web3 = new Web3('https://sepolia.infura.io/v3/8924bca36b3d46ee8eb528306b5f1dfc');
  //   const newContract = new web3.eth.Contract(contractABI, contractAddress);
  //   const result = await newContract.methods.isAuthorized("0x47056Cd626f5A2036fe1c7683498244cA9187684", "0x47056Cd626f5A2036fe1c7683498244cA9187684").call();
  //   // if(result){
  //   //   message.success('Action completed successfully!');
  //   //   handleFileRetrive();
  //   //   // downloadFile();
  //   // } else {
  //   //   message.error('Permisssion Denied');
  //   // }
  //   handleFileRetrive();
  //   console.log("result", result)
  // }

  const downloadFile = async() => {
    const form = new FormData();
    form.append("walletAddress", "address");
    form.append("patientPublicKey", "67a88eba514d0397c7288d406647f133e818088c5e45e9b69efdb158091447ad742b5a38044be66f4195d99f17bedbafb9f4d3fbc19d46d4acfacd747b8313dc");

    try{
      axios
        .post("https://6ff3-129-19-63-118.ngrok-free.app/api/v1/file/retrieve", form, {  headers: { "Content-Type": "multipart/form-data", }, })
        .then((response) => {
          // console.log("sucessfully uploaded",response.data);
          // message.success('Upload completed successfully!');
          alert(response.data)
        })
        .catch((error) => {
          console.error("error", error);
        })
      
      // if(onFileUpload){
      //   onFileUpload(file);
      // }
      // setFileUploadError("");
    }
    catch(e) {
      console.log("error in upload axios call", e)
    }
  }


  return (
    <>
      <Meta title="Contact" />
      <BreadCrumb title="Practitioner Request List" className="header-class"/>
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
            <Form
              form={form}
              ref={formRef}
              // onFieldsChange={(c, a)=>{
              // if(c[0]?.name[0]==="grade"){
              //   setGrade(c[0].value);
              // }
              // const isErrors = form
              // .getFieldsError()
              // .some((error) => error.errors.length > 0);
              // setError(isErrors);
              // }}
              // onFinish={onSaveDocument}>
              onFinish={handleClick}>
            
            <InputForm
                formItemName="patientWalletAddress"
                formItemLabel={"Patient Wallet Address"}
                rulesMsg={"Patient Wallet Address"}
                required={true}
                tooltipTitle={"Patient Wallet Address"}
                placeholderText="Patient Wallet Address"
                clearField={false}
              />

              <InputForm
                formItemName="patientPublicKey"
                formItemLabel={"Patient Public Key"}
                rulesMsg={"Patient Public Key"}
                required={true}
                tooltipTitle={"Patient Public Key"}
                placeholderText="Patient Public Key"
                clearField={false}
              />

              <InputForm
                formItemName="practitionerPublicKey"
                formItemLabel={"Practitioner Public Key"}
                rulesMsg={"Practitioner Public Key"}
                required={true}
                tooltipTitle={"Practitioner Public Key"}
                placeholderText="Practitioner Public Key"
                clearField={false}
              />
              <Button className="upload-document-submit-button"  htmlType="submit">
                    Retrive Document
              </Button>
              <br/>
              <br/>
              <br/>
              <div>
                {JSON.stringify(result1)}
              </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
