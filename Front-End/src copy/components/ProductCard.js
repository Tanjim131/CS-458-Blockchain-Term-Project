import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { message } from "antd";
import { Form, Typography, Card, Divider } from "antd";

import InputForm from "./common/input-form/InputForm";
import Button from "./common/button/Button";


import { contractABI, contractAddress } from "../pages/Data";

function ProductCard(props) {
  const [form] = Form.useForm();
  const formRef = React.createRef();
  const { type } = props;

  const { Text } = Typography;

  const [contract, setContract] = useState(null);
  const [result, setResult] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(async () => {
    console.log("contractABI", contractABI);
    console.log("contractAddress", contractAddress);

    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setAccount(account);
    console.log("accounts", account)

    let web3 = new Web3(window.ethereum);

    // const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/8924bca36b3d46ee8eb528306b5f1dfc'));

    var contractInstance = new web3.eth.Contract(contractABI, contractAddress); // Call the contract's functions// Note: The account calling the function must be unlocked
    setContract(contractInstance);
  }, []);

  const handleClick = async (addDocsDetails) => {
    // Check if Web3 is injected by a provider like MetaMask
    console.log("window.ethereum", window.ethereum)

    if (window.ethereum) {
      try {
        // Request account access

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        }); // MetaMask is connected, and the user granted access to their Ethereum accounts

        const userAddress = accounts[0]; // The user's Ethereum address // Initialize web3 with the given provider (MetaMask)

        const web3 = new Web3(window.ethereum);
        var contractInstance = new web3.eth.Contract(contractABI, contractAddress); // Call the contract's functions// Note: The account calling the function must be unlocked
        // setContract(contractInstance);

        const result = await contractInstance.methods
        .createPatient(
          addDocsDetails.name,
          addDocsDetails.dateOfBirth,
          addDocsDetails.email,
          addDocsDetails.publicKey,
          addDocsDetails.addrss
        )
        .call({ from: account }, function (error, result) {
          console.log("result after the call", result);
        });

        console.log("MetaMask connected. User address:", userAddress);
      } catch (error) {
        // User denied account access or an error occurred

        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      // No web3 provider (e.g., MetaMask) is installed or active

      console.error("MetaMask is not installed or active.");
    }
  }

  const handleClick1 = async (addDocsDetails) => {
    // if (!contract) return;
    console.log("addDocsDetails", addDocsDetails);
    console.log("type", type);

    try {
      // Call a contract function
      // if(type === "Practitioner"){
      //   // const result = await contract.methods.createPractitioner(addDocsDetails.name, addDocsDetails.dateOfBirth, addDocsDetails.email, addDocsDetails.instituteName, addDocsDetails.designation, addDocsDetails.publicKey, addDocsDetails.addrss).call();
      const result = await contract.methods
        .createPatient(
          addDocsDetails.name,
          addDocsDetails.dateOfBirth,
          addDocsDetails.email,
          addDocsDetails.publicKey,
          addDocsDetails.addrss
        )
        .call({ from: account }, function (error, result) {
          console.log(result);
        });

      // const result = await contract.methods.createPractitioner(addDocsDetails.name, addDocsDetails.dateOfBirth, addDocsDetails.email, addDocsDetails.instituteName, addDocsDetails.designation, addDocsDetails.publicKey, addDocsDetails.addrss).call();
      // } else if(type === "abc") {
      //   const result = await contract.methods.createPatient(addDocsDetails.name, addDocsDetails.dateOfBirth, addDocsDetails.email, addDocsDetails.publicKey, addDocsDetails.addrss).call();
      // }
      console.log("result from createPatient", result);
      message.success("Registration successfull!");
      setResult(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Divider />
      <div className="basic-details-step-wrapper">
        <div>
          <Text
            strong={true}
            type="secondary"
            className="add-document-sub-heading"
          >
            "Basic Details"
          </Text>
        </div>
        <Card className="document-details-card">
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
            onFinish={handleClick}
          >
            <InputForm
              formItemName="name"
              formItemLabel={"Name"}
              rulesMsg={"Name"}
              required={true}
              tooltipTitle={"Name"}
              placeholderText="Name"
              clearField={false}
            />

            {/* <DatePickerForm
                // onChangeDate={onChangeDateStart}
                formItemName="dateOfBirth"
                formItemLabel={"Date of Birth"}
                rulesMsg={"start_date_error"}
                required={true}
                dateFormat={dateFormat}
              /> */}

            <InputForm
              formItemName="dateOfBirth"
              formItemLabel={"DOB"}
              rulesMsg={"DOB"}
              required={true}
              tooltipTitle={"DOB"}
              placeholderText="DOB"
              clearField={false}
            />

            <InputForm
              formItemName="email"
              formItemLabel={"Email"}
              rulesMsg={"Email"}
              required={true}
              tooltipTitle={"Email"}
              placeholderText="Email"
              clearField={false}
            />
            {type === "Practitioner" && (
              <>
                <InputForm
                  formItemName="instituteName"
                  formItemLabel={"Institute Name"}
                  rulesMsg={"Institute Name"}
                  required={true}
                  tooltipTitle={"Institute Name"}
                  placeholderText="Institute Name"
                  clearField={false}
                />
                <InputForm
                  formItemName="designation"
                  formItemLabel={"Designation"}
                  rulesMsg={"Designation"}
                  required={true}
                  tooltipTitle={"Designation"}
                  placeholderText="Designation"
                  clearField={false}
                />
              </>
            )}
            <InputForm
              formItemName="addrss"
              formItemLabel={"Wallet Address"}
              rulesMsg={"Wallet Address"}
              required={true}
              tooltipTitle={"Wallet Address"}
              placeholderText="Wallet Address"
              clearField={false}
            />
            <InputForm
              formItemName="publicKey"
              formItemLabel={"Public Key"}
              rulesMsg={"Public Key"}
              required={true}
              tooltipTitle={"Public Key"}
              placeholderText="Public Key"
              clearField={false}
            />

            <Button className="upload-document-submit-button" htmlType="submit">
              Register
            </Button>
          </Form>
        </Card>
      </div>
      <Divider />
    </div>
  );
}

export default ProductCard;
