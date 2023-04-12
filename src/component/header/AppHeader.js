import { Menu } from "antd";
import '../css/AppHeader.css'
import { BellOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import AppCart from "./AppCart";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AppHeader() {
    //Set key when selected in menu
    const [keySelect, setKeySelect] = useState("");
    const [logIn, setLogIn] = useState(getItem(<LockOutlined />, "login"));
    //get user if login success
    const userLogIn = JSON.parse(sessionStorage.getItem('user')) || {};


    const navigate = useNavigate();

    function getItem(label, key, icon, children, type) {
        return { label, key, icon, children, type }
    }

    //Navigate to other page and set key selected
    const onMenuClick = (item) => {
        if (item.key === "login") {
            setKeySelect(`${item.key}`);
            // setLogIn(getItem(<UserOutlined />, "user"))
            navigate(`/${item.key}`);
        }
        else if (item.key === "user") {
            setKeySelect(`${item.key}`);
            navigate(`/${item.key}`);
        }
        else if (item.key === "notify") {
            setKeySelect(`${item.key}`);
        }
        else if (item.key === "cart") {
            setKeySelect(`${item.key}`);
        }
    }
    //When click outside Menu, set key selected ""
    const onMenuBlur = () => {
        setKeySelect("");
    }

    const items = [
        getItem(<BellOutlined />, "notify"),
        logIn,
        getItem(<AppCart />, "cart")
    ]

    //When login success change AppLogin = AppUser and if logout change back
    useEffect(() => {
        if (userLogIn.username) {
            setLogIn(getItem(<UserOutlined />, "user"));
        }
        else {
            setLogIn(getItem(<LockOutlined />, "login"));
        }
    }, [userLogIn.username])

    return (
        <div className="appHeader">
            <div className="logo" />
            <Menu
                selectedKeys={[keySelect]}
                className="menuHeader"
                onClick={onMenuClick}
                onBlur={onMenuBlur}
                theme="dark"
                mode="horizontal"
                items={items}
            >
            </Menu>
        </div>
    )
}