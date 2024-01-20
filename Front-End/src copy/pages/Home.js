import React, { useState, FC, useRef, useEffect } from "react";
import axios from "axios";
import { message } from 'antd';
import { Form } from "antd";
import Button from "../components/common/button/Button";
import {
  InfoCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import BreadCrumb from "../components/BreadCrumb";
import InputForm from "../components/common/input-form/InputForm";

const S3_UPLOAD_FILE = "s3-upload-file ";
const S3_UPLOAD_FILE_ERROR = "s3-upload-file-error";


/**
 * This is used for upload file
 *
 */
const UploadFile = (props) => {
  const {
    isClear,
    fileRequired = "",
    fileDetails = "",
    disabled = false,
    onRemoveFile,
  } = props;
  const hiddenFileInput = useRef(null);
  const [uploadFileName, setFileName] = useState("");
  const [thumbnailImg, setThumbnailImg] = useState("");
  const [fileIcon, setFileIcon] = useState("");
  const [fileUploadError, setFileUploadError] = useState("");
  const [uploadFileSize, setfileSize] = useState(0);
  const [fileData, setFileData] = useState();

  const [form] = Form.useForm();
  const formRef = React.createRef();


  const APPLICATION_PDF = "application/pdf";

  useEffect(() => {
    if (isClear) {
      setFileName("");
      setfileSize(0);
      setThumbnailImg("");
      setFileUploadError("");
    }
  }, [isClear]);

  useEffect(() => {
    setFileUploadError(fileRequired);
  }, [fileRequired]);

  useEffect(() => {
    if (fileDetails) {
      if (fileDetails.fileSize) {
        setfileSize(fileDetails.fileSize);
      }
      if (fileDetails.fileName && fileDetails.fileExtension) {
        const setDocName = fileDetails.fileName.includes(
          fileDetails.fileExtension
        )
          ? fileDetails.fileName
          : `${fileDetails.fileName}.${fileDetails.fileExtension}`;
        setFileName(setDocName);
      }
      if (fileDetails.thumbnailUrl) {
        setThumbnailImg(fileDetails.thumbnailUrl);
      }
      if (fileDetails.fileExtension) {
        setFileIcon(fileDetails.fileExtension === "pdf" ? APPLICATION_PDF : "");
      }
    }
  }, [fileDetails]);
  /**
   * This is used for handle click for upload document
   */
  const handleFileUploadbtn = () => {
    hiddenFileInput.current.click();
  };

  const handleFileUpload = (file) => {
    console.log(file[0])
    setFileName(file[0].name);
    const imageStr = file[0];
    console.log(imageStr)

    setFileData(file[0])
  }

  const handleClick = async (data) => {
    console.log("data", data)
    console.log("fileData", fileData)

    const form = new FormData();
    form.append("encryptedHealthDocument", fileData);
    form.append("encryptedKey", data.encryptedKey);
    form.append("patientWalletAddress", data.patientWalletAddress);
    form.append("fileExtension", data.fileExtension);
    form.append("patientPublicKey", data.patientPublicKey);


    try{

      axios
        .post("https://a93f-129-19-63-118.ngrok-free.app/api/v1/file/upload", form, {  headers: { "Content-Type": "multipart/form-data", }, })
        .then((response) => {
          console.log("sucessfully uploaded",response.data);
          message.success('Upload completed successfully!');
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
  };



  /**
   * This is used for remove upload document
   */
  const removeUploadedFile = () => {
    setFileName("");
    setfileSize(0);
    setThumbnailImg("");
    setFileUploadError("");
    if(onRemoveFile){
      onRemoveFile();
    }
  };

  return (
    <>
    <div className="container-xxl">
    <BreadCrumb title="Patient Upload Document" />
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
        // onFinish={handleClick}
        // onFinish={() => {alert('called')}}
      >
          <>
            <div
              className={
                S3_UPLOAD_FILE +
                (fileUploadError ? S3_UPLOAD_FILE_ERROR : "") +
                (disabled ? " disabled" : "")
              }
              onClick={handleFileUploadbtn}
            >
              <div className="upload-text">
                <UploadOutlined className="upload-icon" />
                {/* {isMobile()
                  ? translate("upload_from_mobile")
                  : translate("upload_from_desktop")} */}
              </div>
              {/* <div>{translate("upload_information2")}</div>
              <div>{translate("upload_information3")}</div> */}
              <input
                ref={hiddenFileInput}
                type="file"
                name="files"
                accept="application/pdf, image/png, image/jpeg"
                onChange={(e) => handleFileUpload(e.target.files)}
                style={{ display: "none" }}
              />
            </div>
            <div className="width-25">
            <InputForm
                formItemName="encryptedKey"
                formItemLabel={"Encrypted Key Name"}
                rulesMsg={"Encrypted Key Name"}
                required={true}
                tooltipTitle={"Encrypted Key Name"}
                placeholderText="Encrypted Key Name"
                clearField={false}
              />
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
                formItemName="fileExtension"
                formItemLabel={"File Extension"}
                rulesMsg={"File Extension"}
                required={true}
                tooltipTitle={"File Extension"}
                placeholderText="File Extension"
                clearField={false}
              />

              <Button className="upload-document-submit-button"  htmlType="submit" onClick={()=>{message.success("Document Uploaded Sucessfully")}}>
                    Upload
              </Button>
              </div>
          </>
      </Form.Item>
      </Form>
      </div>
    </>
  );
};

export default UploadFile;
