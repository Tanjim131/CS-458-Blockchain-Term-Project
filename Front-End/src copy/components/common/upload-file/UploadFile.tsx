import React, { useState, FC, useRef, useEffect } from "react";
import { Form, Typography, Row, Col, Image } from "antd";
import {
  InfoCircleOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { injectIntl, IntlShape } from "react-intl";
import generatePdfThumbnails from "pdf-thumbnails-generator";
import translate from "../../../../i18n/translate";
import byteToMB from "../../../../utils/file/byteToMB";
import { fileToBase64 } from "../../../../utils/file/fileToBase64";
import {
  getFileSizeInMB,
  getAllowedFileFormat,
} from "../../../../utils/file/downloadFromUrl";
import isMobile from "../../../../utils/type/isMobile";
import convertFileSize from "../../../../utils/file/fileSize";

import "./UploadFile.less";

const { Text } = Typography;
const S3_UPLOAD_FILE = "s3-upload-file ";
const S3_UPLOAD_FILE_ERROR = "s3-upload-file-error";

/**
 * Interface for File Details.
 */
interface IFileDetailsProps {
  fileSize?: number;
  fileName?: string;
  fileExtension?: string;
  thumbnailUrl?: string;
}
/**
 * Interface for upload file.
 */
interface IUploadFileProps {
  intl: IntlShape;
  fileRequired?: string;
  isClear: boolean;
  fileDetails?: IFileDetailsProps;
  disabled?: boolean;
  onFileUpload?: (file: any) => void;
  onRemoveFile?: () => void;
}

/**
 * This is used for upload file
 *
 * @usage: <UploadFile onFileUpload={} onRemoveFile={} fileUploadError={string} uploadLabel={string} uploadInfo={string} uploadInformation1={string} uploadInformation2={string} uploadInformation3={string} />
 */
const UploadFile: FC<IUploadFileProps> = (props: IUploadFileProps) => {
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
        const setDocName: string = fileDetails.fileName.includes(
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
  /**
   * This is used for handle the upload document
   */
  const handleFileUpload = async (file: any) => {
    if (file && getAllowedFileFormat(file[0].type)) {
      setfileSize(file[0].size);
      const fileSize: any = byteToMB(file[0].size);
      if (fileSize > 2) {
        setFileUploadError(intl.formatMessage({ id: "upload_2mb_error" }));
      } else {
        setFileName(file[0].name);
        const imageStr: any = await fileToBase64(file[0]);
        if (file[0].type === APPLICATION_PDF) {
          const thumbnails = await generatePdfThumbnails(imageStr, 200);
          setThumbnailImg(thumbnails[0].thumbnail);
          file.thumbnails = thumbnails[0].thumbnail;
          setFileIcon(APPLICATION_PDF);
        } else {
          setThumbnailImg(imageStr);
          setFileIcon("");
          file.thumbnails = imageStr;
        }
        
        if(onFileUpload){
          onFileUpload(file);
        }

        setFileUploadError("");
      }
    } else {
      setFileUploadError(intl.formatMessage({ id: "accept_files_msg" }));
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
      <Form.Item
        name="docFile"
        label={translate("upload_soft_copy_label")}
        className="add-document-form-field upload-document-field"
        tooltip={{
          title: translate("upload_soft_copy_info"),
          icon: <InfoCircleOutlined />,
          placement: "right",
          overlayClassName: "tooltip-add-document",
        }}
      >
        {thumbnailImg ? (
          <>
            <div className="document-details">
              <Image
                className="upload-pdf-img-preview"
                src={thumbnailImg}
              />
              <Row>
                <Col span={20} className="document-information">
                  {fileIcon ? (
                    <FilePdfOutlined className="pdf-file-icon" />
                  ) : (
                    <FileImageOutlined className="pdf-file-icon" />
                  )}
                  <Text className="document-name-size">
                    <Text className="document-name">{uploadFileName}</Text>
                    <Text className="document-size">
                      {convertFileSize(uploadFileSize)}
                    </Text>
                  </Text>
                </Col>
                <Col span={4}>
                  <DeleteOutlined
                    className="remove-file"
                    onClick={removeUploadedFile}
                  />
                </Col>
              </Row>
            </div>
          </>
        ) : (
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
                {isMobile()
                  ? translate("upload_from_mobile")
                  : translate("upload_from_desktop")}
              </div>
              <div>{translate("upload_information2")}</div>
              <div>{translate("upload_information3")}</div>
              <input
                ref={hiddenFileInput}
                type="file"
                name="files"
                accept="application/pdf, image/png, image/jpeg"
                onChange={(e) => handleFileUpload(e.target.files)}
                style={{ display: "none" }}
              />
            </div>
            {fileUploadError ? (
              <div className="upload-file-error">{fileUploadError}</div>
            ) : (
              ""
            )}
          </>
        )}
      </Form.Item>
    </>
  );
};

export default injectIntl(UploadFile);
