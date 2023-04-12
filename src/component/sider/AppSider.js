import React, { useState } from "react";
import '../css/AppSider.css'
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { HomeOutlined, ShoppingFilled, ShoppingOutlined, HeartOutlined, InboxOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";

export default function AppSider() {
    // const [keySelect, setKeySelect] = useState("")
    const [collapsed, setCollapsed] = useState(true);
    function getItem(label, key, icon, children, type) {
        return { label, key, icon, children, type }
    }
    const navigate = useNavigate();

    const onSiderClick = (item) => {
        navigate(`/${item.key}`);
    }

    // const onSiderBlur = () => {
    //     setKeySelect("");
    // }

    const items = [
        getItem("Home", "", <HomeOutlined />),
        getItem("All Products", "all-products", <InboxOutlined />),
        getItem("Men's Fashion", "men", <ShoppingFilled />, [
            getItem("Men's Shirts", "mens-shirts"),
            getItem("Men's Shoes", "mens-shoes"),
            getItem("Men's Watches", "mens-watches"),

        ]),
        getItem("Women's Fashion", "women", <ShoppingOutlined />, [
            getItem("Women's Dresses", "womens-dresses"),
            getItem("Women's Shoes", "womens-shoes"),
            getItem("Women's Watches", "womens-watches"),
            getItem("Women's Bags", "womens-bags"),
            getItem("Women's Jewellery", "womens-jewellery"),
        ]),
        getItem("Fragrances", "fragrances", <HeartOutlined />)
    ]
    // const items = [
    //     {
    //         label: <HomeFilled />,
    //         key: "",
    //     },
    //     {
    //         label: "Men's Fashion",
    //         key: "men",
    //         children: [
    //             {
    //                 label: "Men's Shirts",
    //                 key: "mens-shirts",
    //             },
    //             {
    //                 label: "Men's Shoes",
    //                 key: "mens-shoes",
    //             },
    //             {
    //                 label: "Men's Watches",
    //                 key: "mens-watches",
    //             },
    //         ]
    //     },
    //     {
    //         label: "Women's Fashion",
    //         key: "women",
    //         children: [
    //             {
    //                 label: "Women's Dresses",
    //                 key: "womens-dresses",
    //             },
    //             {
    //                 label: "Women's Shoes",
    //                 key: "womens-shoes",
    //             },
    //             {
    //                 label: "Women's Watches",
    //                 key: "womens-watches",
    //             },
    //             {
    //                 label: "Women's Bags",
    //                 key: "womens-bags",
    //             },
    //             {
    //                 label: "Women's Jewellery",
    //                 key: "womens-jewellery",
    //             },
    //         ]
    //     },
    //     {
    //         label: "Fragrances",
    //         key: "fragrances",
    //     }
    // ];
    return (
        <div className="appSider">
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                theme='light'
                width={"200px"}
                style={{
                    backgroundColor: 'white',
                    zIndex: 'revert',
                }}>
                <Menu
                    // selectedKeys={keySelect}
                    // onBlur={onSiderBlur}
                    onClick={onSiderClick}
                    mode="inline"
                    defaultSelectedKeys={['']}
                    defaultOpenKeys={['']}
                    style={{
                        height: '100%',
                        borderRight: 0,
                        alignItems: "center",
                    }}
                    items={items}
                />
                <div
                    style={{
                        height: "100vh",
                        margin: 16,
                    }} />
            </Sider>
        </div>
    )
}