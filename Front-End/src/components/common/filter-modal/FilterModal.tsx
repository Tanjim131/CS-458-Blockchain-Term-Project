import React, { FC } from "react";
import { Modal, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";

import FilterButton, { ButtonType } from "../button/Button";
import translate from "../../../../i18n/translate";
import "./FilterModal.less";

/**
 * Interface for Request Filter Modal.
 */
interface IFilterModal {
  visible: boolean;
  onCancel: () => void;
  children: any;
  buttonDisabled: boolean;
  showFilterModal: () => void;
  onFilterApply: () => void;
  clearFilterButton: () => void;
  clearButtonVisible: boolean;
  filterApplied: boolean;
  className?: string;
}

/**
 * This is used for FilterModal
 *
 * @usage: <FilterModal visible={boolean} onCancel={function}/>
 */
const FilterModal: FC<IFilterModal> = (props: IFilterModal) => {
  const { visible, onCancel, children, buttonDisabled, showFilterModal, onFilterApply, clearFilterButton, clearButtonVisible, filterApplied, className } = props;

  return (
  <>
    <Button icon={ <FilterOutlined /> } size="middle" className={`filter-button ${filterApplied ? "filter-tag" : ""}`} onClick={showFilterModal} />
    <Modal
      title={translate("filter_by")}
      className= {`filter-modal ${className}`}
      visible={visible}
      maskClosable={true}
      closable={true}
      onCancel={onCancel}
      footer={
        clearButtonVisible ?
        [
          <FilterButton key={1} type={ButtonType.LINK} className="clear-filter-button" onClick={clearFilterButton}>{translate("clear_all_filter")}</FilterButton>,
          <FilterButton key={2} type={ButtonType.NORMAL} className="cancel-filter-button"  onClick={onCancel}>{translate("cancel")}</FilterButton>,
          <FilterButton key={3} className="apply-filter-button" disabled= {buttonDisabled} onClick={onFilterApply}>{translate("apply_filter")}</FilterButton>,
        ]
          :
        [
          <FilterButton key={2} type={ButtonType.NORMAL} className="cancel-filter-button"  onClick={onCancel}>{translate("cancel")}</FilterButton>,
          <FilterButton key={3} className="apply-filter-button" disabled= {buttonDisabled} onClick={onFilterApply}>{translate("apply_filter")}</FilterButton>,
        ]
    }
    >
      {children}
    </Modal>
  </>);
};

export default FilterModal;
