import React, { useState } from "react"
import Typography from "antd/es/typography/Typography";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Drawer,
    Form,
    Input,
    Checkbox,
    message
} from "antd";

export default function AppCheckout({ setCloseCart, isCartOpen }) {
    const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);


    const userLogIn = JSON.parse(sessionStorage.getItem('user')) || null;
    // const cartProduct = JSON.parse(sessionStorage.getItem('cart')) || [];

    const navigate = useNavigate();

    const onConfirmOrder = () => {
        if (isCartOpen === true) {
            setCloseCart(false)
            setCheckoutDrawerOpen(false);
            sessionStorage.removeItem('cart')
            navigate('/');
            message.success("Your order has been placed successfully.");
        }
        else {
            setCheckoutDrawerOpen(false);
            navigate('/');
            message.success("Your order has been placed successfully.");
        }
    };


    const onClickCheckOut = () => {
        if (userLogIn === null) {
            navigate('/login');
            setCloseCart(false)
        }
        else {
            setCheckoutDrawerOpen(true)
        }
    }

    return (
        <div>
            <Button
                onClick={onClickCheckOut}
                type="primary">
                Checkout
            </Button>
            <Drawer
                open={checkoutDrawerOpen}
                onClose={() => { setCheckoutDrawerOpen(false) }}
                title="Confirm Order"
            >
                <Form
                    onFinish={onConfirmOrder}
                    initialValues={{
                        name: userLogIn?.firstName + " " + userLogIn?.lastName,
                        email: userLogIn?.email
                    }}>
                    <Form.Item
                        rules={[{
                            required: true,
                            message: "Please enter your full name",
                        },
                        ]}
                        label="Full Name"
                        name="name"
                    >
                        <Input style={{ width: "20vw" }} placeholder="Enter your full name.." />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Please enter a valid email",
                            },
                        ]}
                        label="Email"
                        name="email"
                    >
                        <Input style={{ width: "20vw", marginLeft: 30 }} placeholder="Enter your email.." />
                    </Form.Item>
                    <Form.Item
                        rules={[{
                            required: true,
                            message: "Please enter your address",
                        },
                        ]}
                        label="Address"
                        name="address"
                    >
                        <Input style={{ width: "20vw", marginLeft: 14 }} placeholder="Enter your address.." />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox defaultChecked disabled>
                            Cash on Delivery
                        </Checkbox>
                    </Form.Item>
                    <Typography.Paragraph type="secondary">
                        More methods coming soon
                    </Typography.Paragraph>
                    <Button
                        type="primary" htmlType="submit">
                        Confirm Order
                    </Button>
                </Form>
            </Drawer>
        </div >
    )
}
