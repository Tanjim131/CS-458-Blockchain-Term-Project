import React, { useState, FC, useRef, useEffect } from "react";
import axios from "axios";
import { message } from 'antd';
import { Form, Typography, Row, Col, Image } from "antd";
import {
  InfoCircleOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import generatePdfThumbnails from "pdf-thumbnails-generator";
import BreadCrumb from "../components/BreadCrumb";
import byteToMB from "../utils/file/byteToMB";
import { fileToBase64 } from "../utils/file/fileToBase64";
import {
  getFileSizeInMB,
  getAllowedFileFormat,
} from "../utils/file/downloadFromUrl";
import isMobile from "../utils/type/isMobile";
import convertFileSize from "../utils/file/fileSize";
import Button, { ButtonType } from "../components/common/button/Button";

import { contractABI, contractAddress } from "../pages/Data"

const { Text } = Typography;
const S3_UPLOAD_FILE = "s3-upload-file ";
const S3_UPLOAD_FILE_ERROR = "s3-upload-file-error";


/**
 * This is used for upload file
 *
 * @usage: <UploadFile onFileUpload={} onRemoveFile={} fileUploadError={string} uploadLabel={string} uploadInfo={string} uploadInformation1={string} uploadInformation2={string} uploadInformation3={string} />
 */
const UploadFile = (props) => {
  const {
    intl,
    isClear,
    fileRequired = "",
    fileDetails = "",
    disabled = false,
    onFileUpload,
    onRemoveFile,
  } = props;
  const hiddenFileInput = useRef(null);
  const [uploadFileName, setFileName] = useState("");
  const [thumbnailImg, setThumbnailImg] = useState("");
  const [fileIcon, setFileIcon] = useState("");
  const [fileUploadError, setFileUploadError] = useState("");
  const [uploadFileSize, setfileSize] = useState(0);

  const APPLICATION_PDF = "application/pdf";


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
        savePatientHash
        
      </Form.Item>
      </div>
    </>
  );
};

export default UploadFile;
