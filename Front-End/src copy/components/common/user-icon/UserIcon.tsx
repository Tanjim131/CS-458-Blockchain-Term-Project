import React, { FC } from "react";
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import UniversityIcon from "../../../../public/images/svg/university.svg";

interface IUserIcon {
    role: string;
}

const UserIcon: FC<IUserIcon> = (props: IUserIcon) => {
    const { role } = props;
    if (role.toLowerCase().indexOf("agent") > -1) {
        return <TeamOutlined />;
    }
    else if (role.toLowerCase().indexOf("university") > -1) {
        return  <img src={UniversityIcon} />;
    }
    return <UserOutlined />;
}

export default UserIcon;
