import React, { FC } from "react";
import { Card, Progress } from "antd";

import translate from "../../../../../i18n/translate";
import "./CountCard.less";
import Link from "next/link";

interface ICountCard {
    title?: any;
    coinsLeft: number;
    timeLeft: number;
    timeFormat: string;
    ringColor?: string;
    CoinDetailType?: number;
    className?: string;
    CoinDetail?: boolean;
    transactionId?: string;
    walletId: string;
}

const CountCard: FC<ICountCard> = (props: ICountCard) => {
    const { title, coinsLeft, timeLeft, timeFormat, ringColor, CoinDetailType, className, CoinDetail, transactionId,walletId } = props;

    return (
        <Card className={`expiry-range-card ${className}`}>
            <p className={`expiry-range-card-title expiry-range-card-title-${title}`}>
                {title}
            </p>
            <p className="expiry-range-card-total-count">
                {coinsLeft}
            </p>
            <Progress
                type="circle"
                className={"circular-progress circular-progress-" + title}
                percent={100}
                strokeWidth={3}
                strokeColor={timeLeft <= 7 ? "#F5222D" : ringColor}
                width={82}
                format={() => (
                    <div className="circular-progress-content">
                        {timeLeft !== 0
                            ? <>
                                <div className="remaining-time">{timeLeft < 10 ? "0" + timeLeft : timeLeft}</div>
                                <div className="time-format">{timeFormat}</div>
                            </>
                            : <div className="time-format">{translate("today")}</div>}
                    </div>
                )}
            />
        </Card>
    )
}

export default CountCard;
