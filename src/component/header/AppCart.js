import React, { useCallback, useEffect, useMemo, useState } from "react"
import '../css/AppCart.css'
import { DeleteFilled } from '@ant-design/icons';
import { addToCart } from "../API";
import {
    Drawer,
    InputNumber,
    message,
    Table,
    Button
} from "antd";
import {
    ShoppingCartOutlined,
} from "@ant-design/icons"
import AppCheckout from "./AppCheckout";


export default function AppCart() {
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    let cartProduct = JSON.parse(sessionStorage.getItem('cart')) || [];

    const addToCartCallBack = useCallback(
        async (product) => {
            const res = await addToCart(product);
            setCartItems(res.products);
        }, []);


    useEffect(() => {
        addToCartCallBack(cartProduct);
    }, [cartProduct, addToCartCallBack]);



    //When change quantity it will change total
    const onQuantityChange = (value, record) => {
        const newCartItems = cartItems.map((cartItem) => {
            if (cartItem.id === record.id) {
                const updatedCartItem = { ...cartItem };
                updatedCartItem.quantity = value;
                updatedCartItem.total = updatedCartItem.price * value;
                return updatedCartItem;
            }
            return cartItem;
        });
        sessionStorage.setItem("cart", JSON.stringify(newCartItems));
    };

    //Open cart drawer
    const onClickCart = () => {
        setCartDrawerOpen(true)
    };

    const onDeleteCart = (value) => {
        let cartProducts = [...cartProduct];
        let count = 0
        cartProducts.forEach(item => {
            if (item.id === value.id) {
                cartProducts.splice(count, 1);
                sessionStorage.setItem("cart", JSON.stringify(cartProducts));
                message.success(`${value.title} has removed from cart`)
            }
            count++;
        });
    };


    return (
        <div>
            <ShoppingCartOutlined
                onClick={onClickCart}
                className="shoppingCartIcon"
            />
            <Drawer
                open={cartDrawerOpen}
                onClose={() => { setCartDrawerOpen(false) }}
                title="Your Cart"
                contentWrapperStyle={{ width: "100%", maxWidth: "500px" }}
            >
                <table className="tbCart">
                    <thead className="headCart">
                        <tr className="trCart">
                            <th className="thCart">Title</th>
                            <th className="thCart">Price</th>
                            <th className="thCart">Quantity</th>
                            <th className="thCart">Total</th>
                        </tr>
                    </thead>
                    <tbody className="bodyCart">
                        {cartItems && cartItems.map((cartItem) => (
                            <tr className="trCart" key={cartItem.id}>
                                <td className="tdCart">{cartItem.title}</td>
                                <td className="tdCart">${cartItem.price.toFixed(0)}</td>
                                <td className="tdCart">
                                    <input
                                        onKeyDown={(event) => { event.preventDefault() }}
                                        onChange={(event) => onQuantityChange(event.target.value, cartItem)}
                                        style={{ width: "50px" }}
                                        min={1}
                                        max={10}
                                        type="number"
                                        defaultValue={cartItem.quantity}></input>
                                </td>
                                <td className="tdCart">${cartItem.total.toFixed(0)}</td>
                                <td className="tdCart">
                                    <Button danger onClick={() => onDeleteCart(cartItem)}>
                                        <DeleteFilled />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {/* <tbody className="bodyCart">
                        {cartItems && cartItems.map((cartItem) => (
                            <tr className="trCart" key={cartItem.id}>
                                <td className="tdCart">{cartItem.title}</td>
                                <td className="tdCart">${cartItem.price.toFixed(2)}</td>
                                <td className="tdCart">
                                    <input
                                        onKeyDown={(event) => { event.preventDefault() }}
                                        onChange={(event) => onQuantityChange(event.target.value, cartItem)}
                                        style={{ width: "50px" }}
                                        min={1}
                                        max={10}
                                        type="number"
                                        defaultValue={cartItem.quantity}></input>
                                </td>
                                <td className="tdCart">${cartItem.total.toFixed(0)}</td>
                                <td className="tdCart">
                                    <Button danger onClick={() => onDeleteCart(cartItem)}>
                                        <DeleteFilled />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody> */}
                </table>

                {/* Ant design */}
                {/* <Table
                    pagination={false}
                    columns={[
                        {
                            title: "Title",
                            dataIndex: "title",
                        },
                        {
                            title: "Price",
                            dataIndex: "price",
                            render: (value) => {
                                return <span>${value}</span>;
                            },
                        },
                        {
                            title: "Quantity",
                            dataIndex: "quantity",
                            render: (value, record) => {
                                return (
                                    <InputNumber min={1} max={10} type="number"
                                        defaultValue={value}
                                        // onChange={(value) => {
                                        //     setCartItems((pre) => pre.map((cart) => {
                                        //         if (record.id === cart.id) {
                                        //             cart.quantity = value;
                                        //             cart.total = cart.price * value;
                                        //         }
                                        //         return cart;
                                        //     })
                                        //     );
                                        // }}
                                        onChange={(value) => onQuantityChange(value, record)}
                                    ></InputNumber>
                                );
                            },
                        },
                        {
                            title: "Total",
                            dataIndex: "total",
                            render: (value) => {
                                return <span>${value}</span>;
                            },
                        },
                        {
                            render: (record) => {
                                return (
                                    <Button onClick={() => {
                                        onDeleteCart(record)
                                    }}>X</Button>
                                )
                            }
                        }
                    ]}
                    dataSource={cartItems}
                /> */}

                <div style={{ float: "right" }}>
                    <span style={{ float: "right", marginRight: 75 }}>
                        Total: $
                        {cartItems && cartItems.reduce((pre, current) => {
                            return pre + current.total;
                        }, 0)}
                    </span>
                    <AppCheckout setCloseCart={setCartDrawerOpen} isCartOpen={cartDrawerOpen} />
                </div>
            </Drawer>
        </div>
    );
}