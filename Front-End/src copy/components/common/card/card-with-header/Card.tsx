import React, { FC } from "react";
import { Card } from "antd";

import translate from "../../../../../i18n/translate";
import Button, { ButtonType } from "../../button/Button";
import "./Card.less";
import Link from 'next/link';

interface IWalletCard {
    icon: any;
    title: any;
    coinLeft: number | string;
    headerColorClass: string;
    showButton?: boolean;
    handleAddFreeCoin?: () => void;
    showViewDetails?: boolean;
    handleViewDetails?: () => void;
    CoinDetailType: number;
    walletId: string;
}


const WalletCard: FC<IWalletCard> = (props: IWalletCard) => {
    const { icon, title, coinLeft, showButton = false, headerColorClass, showViewDetails = true,
        handleAddFreeCoin, CoinDetailType,walletId } = props;
    return (
        <Card
            title={title}
            className={`my-wallet-color-card ${headerColorClass}`}
        >
            <div className="card-coin-and-button">
                <div className="card-content">
                    <div className="coin-balance">{translate("coin_balance")}</div>
                    <div className="coin-balance-amount">{coinLeft}</div>
                    <img className="coins-icon" src={icon} />
                </div>
                {showButton && (
                    <Button
                        children={translate("add_free_coins")}
                        type={ButtonType.PRIMARY}
                        className="add-free-coins-button"
                        onClick={handleAddFreeCoin}
                    />)}
            </div>
            {showViewDetails && (
                <Link href={`/coinDetails/${walletId}/${CoinDetailType}`}>
                    <a className="view-detail-text-button">
                        {translate("view_details")}
                    </a>
                </Link>
            )}
        </Card>
    );
};

export default WalletCard;
