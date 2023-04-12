import { Button, Input, Checkbox, message } from "antd"
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Form from "antd/es/form/Form"
import { Link, useNavigate } from "react-router-dom";
import { loginAndGetToken } from "../API";
import { useState } from "react";


export default function AppLogin() {
    const [isChecked, setIsChecked] = useState(true)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const rememberUsr = JSON.parse(localStorage.getItem('rememberUsr')) || "";
    const rememberPas = JSON.parse(localStorage.getItem('rememberPas')) || "";

    const onConfirmLogin = (value) => {
        //Code to verify login and get token
        setLoading(true)
        loginAndGetToken(value.username, value.password).then(token => {
            if (token.username === value.username && value.username !== "") {
                //Check if checked checkbox Remember me, save username and password to localStorage
                if (isChecked === true) {
                    localStorage.setItem('rememberUsr', JSON.stringify(value.username));
                    localStorage.setItem('rememberPas', JSON.stringify(value.password));
                    // setIsChecked(true)
                }
                //Remove username and password out localStorage if unchecked remember
                else {
                    localStorage.removeItem('rememberUsr');
                    localStorage.removeItem('rememberPas');
                }
                setLoading(false);
                //Set information of user to sessionStorage
                sessionStorage.setItem('user', JSON.stringify(token));
                navigate('/');
                message.success(`Welcome back ${token.firstName} ${token.lastName}!`);
            }
            else {
                message.error("This account doesn't exist");
                // message.error("Please use this account: atuny0, password: 9uQFF1Lh");
                setLoading(false);

            }
        })
    }

    //Checked remember
    const onCheckedRemember = (value) => {
        //Get value "true" or "false" when checked remember
        let checked = value.target.checked
        //Set value to state
        setIsChecked(checked);
    }

    return (
        <div>
            <Form
                onFinish={onConfirmLogin}
                className="formLogin"
                // Set value "username" and "password" to two input username and password
                initialValues={{
                    remember: true,
                    username: rememberUsr,
                    password: rememberPas
                }}>
                <Form.Item
                    rules={[{
                        required: true,
                        message: 'Please enter your username!'
                    }]}
                    name="username">
                    <Input
                        style={{ width: 300 }}
                        prefix={<UserOutlined />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    rules={[{
                        required: true,
                        message: 'Please enter your password!'
                    }]}
                    name="password">
                    <Input.Password
                        style={{ width: 300 }}
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox defaultChecked={isChecked} onChange={onCheckedRemember}>Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit"
                        className="login-form-button"
                        style={{ width: 300 }}>
                        Log in
                    </Button>
                    <br />
                    Or <Link to={"/register"}>Register now!</Link>
                    <a href="#" className="login-form-forgot">Forgot Password</a>
                </Form.Item>
            </Form>
        </div >
    )
}