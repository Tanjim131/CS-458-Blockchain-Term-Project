import React, { FC } from "react";

interface IFileViewerProps {
  url: string;
}

/**
 * File viewer component.
 *
 * @Usage: <FileViewer url={string} fileType={FileTypes}/>
 */
const FileViewer: FC<IFileViewerProps> = (props: IFileViewerProps) => {
  const { url } = props;

  /**
   * Get the specific file loader based on the file extension.
   */
  function getFileLoader() {
    const fileUrl: string = url.toLowerCase();

    if (fileUrl && fileUrl.includes(".pdf")) {
      return <iframe width="100%" height="100%" src={url} />;
    }
    if (fileUrl && (fileUrl.includes(".jpg") || fileUrl.includes(".jpeg") || fileUrl.includes(".png"))) {
      return <img style={{ width: "100%", height: "100%" }} src={url} />;
    }
    return <></>;
  }

  return (<>
    {
      getFileLoader()
    }
  </>);
};

export default FileViewer;
