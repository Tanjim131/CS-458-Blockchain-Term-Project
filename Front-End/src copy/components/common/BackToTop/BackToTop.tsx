import { Affix, BackTop, Col, Row, Tooltip } from "antd";
import React, { FC } from "react";
import Icon_Back_Top from "../../../../public/svg/icon_back_to_top.svg";

interface IBackToTopProps {}

/**
 * Back to Top component.
 *
 * @Usage: <BackToTop />
 */
const BackToTop: FC<IBackToTopProps> = (props: IBackToTopProps) => {
  return (
    <BackTop>
      <Tooltip placement="top" title={"Back to Top"}>
        <img src={Icon_Back_Top} />
      </Tooltip>
    </BackTop>
  );
};

export default BackToTop;
