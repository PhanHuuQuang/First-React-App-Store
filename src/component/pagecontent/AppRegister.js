import {
    Button, Input, Upload, Modal, Radio, Form, message
} from "antd";
import '../css/AppPage.css'
import { PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import { addAUser } from "../API";
import { useNavigate } from "react-router-dom";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function AppRegister() {
    const navigate = useNavigate();
    //Radio
    const [radioValue, setRadioValue] = useState("male");

    //Image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);


    const handleCancel = () => setPreviewOpen(false);
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    //Image
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 1,
                }}
            >
                Upload
            </div>
        </div>
    );

    //Radio
    const onChoose = (e) => {
        setRadioValue(e.target.value);
    }

    const onRegisterConfirm = (values) => {
        addAUser(values.username, values.password, values.firstName, values.lastName, values.gender).then(
            res => {
                navigate("/login");
                message.success(`${res.firstName} ${res.lastName} is register success!`)
                console.log(res);
            }
        )
    }


    return (
        <div>
            <Form onFinish={onRegisterConfirm}
                className="formRegister">
                <Form.Item
                    name="username"
                    rules={[{
                        required: true,
                        message: 'Please input username!'
                    }]}>
                    <div>
                        <div>Username:</div>
                        <Input
                            style={{ width: 300 }}
                            placeholder="Username" />
                    </div>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Please input password and re-password!'
                    }]}>
                    <div>
                        <div>Password:</div>
                        <Input.Password
                            style={{ width: 300 }}
                            placeholder="Password" />
                    </div>
                </Form.Item>
                <Form.Item
                    name="rePassword"
                    rules={[{
                        required: true,
                        message: 'Please input password and re-password!'
                    }]}>
                    <div>
                        <div>Re-Password:</div>
                        <Input.Password
                            style={{ width: 300 }}
                            placeholder="Password" />
                    </div>
                </Form.Item>
                <div style={{ display: 'flex' }}>
                    <Form.Item
                        name="firstName"
                        rules={[{
                            required: true,
                            message: 'Missing Firstname!'
                        }]}>
                        <div style={{ width: 145, marginRight: 10 }}>
                            FirstName:
                            <Input placeholder="First Name" />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        rules={[{
                            required: true,
                            message: 'Missing Lastname!'
                        }]}>
                        <div style={{ width: 145 }}>
                            LastName:
                            <Input placeholder="Last Name" />
                        </div>
                    </Form.Item>
                </div>
                <Form.Item name="gender" onChange={onChoose}>
                    <Radio.Group value={radioValue}>
                        <Radio value="male">
                            Male
                        </Radio>
                        <Radio value="female">
                            Female
                        </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{
                        required: true,
                        message: 'Please enter your email!'
                    }]}>
                    <div>
                        <div>Email:</div>
                        <Input style={{ width: 300 }}
                            placeholder="Email" />
                    </div>
                </Form.Item>

                {/* Image */}
                {/* <Form.Item>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length === 1 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>
                </Form.Item> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{}}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}