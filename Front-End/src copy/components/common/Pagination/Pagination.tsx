import React , { FC } from "react";
import { Pagination } from "antd";

import "./Pagination.less";

interface ITablePagination {
  currentPageNo: number;
  currentPageSize: number;
  totalRecord: number;
  onShowSizeChange: (currentPage: number, pageSize: number) => void;
  setPageNumber: (pageNumber: number) => void;
}

const TablePagination: FC<ITablePagination> = (props: ITablePagination) => {
  const { currentPageNo, currentPageSize, setPageNumber, onShowSizeChange, totalRecord } = props;

  return (
    <Pagination
        className="table-pagination"
        showSizeChanger={true}
        onShowSizeChange={onShowSizeChange}
        current={currentPageNo}
        onChange={setPageNumber}
        defaultCurrent={1}
        total={totalRecord}
        responsive={true}
        pageSizeOptions={["10", "20", "50", "100"]}
        pageSize={currentPageSize}
  />);
};

export default TablePagination;
