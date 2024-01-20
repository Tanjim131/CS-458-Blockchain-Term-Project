import React, { FC } from "react";
import { Card, Tooltip } from "antd";

import translate from "../../../../../i18n/translate";
import epochToDate from "../../../../../utils/date/formatDate";
import "./TicketCard.less";

interface ITicketCard {
    ticketId: String;
    status: any;
    raisedDate: number;
    description: String;
}

const TicketCard: FC<ITicketCard> = (props: ITicketCard) => {
    const { ticketId, status, raisedDate, description } = props;
    return (
        <Card className="ticket-card">
            <div className="ticket-id-wrapper">
                <div className="ticket-id-heading">
                    {translate("lbl_ticketid")}
                </div>
                <div className="ticket-id-content">
                    {ticketId}
                </div>
            </div>
            <div className="status-raised-on">
                <div className="status-column">
                    <div className="status-heading">{translate("status")}</div>
                    <div>{status}</div>
                </div>
                <div className="raised-on-column">
                    <div className="raised-on-heading">{translate("raised_on")}</div>
                    <div className="raised-on-date">{raisedDate && epochToDate(raisedDate, "DD MMM YYYY")}</div>
                </div>
            </div>
            <div className="ticket-description">
            <Tooltip  placement="top" title={description}>
                {description}
            </Tooltip>
            </div>
        </Card>
    )
}

export default TicketCard;
