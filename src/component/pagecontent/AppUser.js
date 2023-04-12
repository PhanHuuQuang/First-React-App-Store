import {
    Button, Input, Radio
} from "antd";
import '../css/AppPage.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AppUser() {
    const [radioValue, setRadioValue] = useState("male");

    //Get user info from local storage or {} if info was clear
    const userDetails = JSON.parse(sessionStorage.getItem('user')) || null;
    const navigate = useNavigate();

    const onLogOutClick = () => {
        sessionStorage.removeItem('user');
        navigate('/login');
    }

    const onRadioChecked = (e) => {
        setRadioValue(e.target.value);
    }


    //Check gender
    useEffect(() => {
        if (userDetails.gender === "male" || userDetails.gender === "female") {
            setRadioValue(userDetails.gender);
        }
    }, [userDetails.gender]);

    return (
        <div>
            <table className="formInfor">
                <tr>
                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                        <img src={userDetails.image} alt="Your Avatar" style={{ width: 100, height: 100, border: '1px solid black' }}></img>
                    </td>
                </tr>
                <tr>
                    <th>Username:
                        <td>
                            <Input
                                value={userDetails.username}
                                defaultValue={''}
                                style={{ width: 300 }}
                                placeholder="Username" />
                        </td>
                    </th>
                </tr>
                <tr>
                    <td >
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: 150, marginRight: 10 }}>
                                <th>FirstName:</th>
                                <Input
                                    value={userDetails.firstName}
                                    style={{
                                        width: 150,
                                    }}
                                    placeholder="First Name" />
                            </div>
                            <div style={{ width: 150 }}>
                                <th>LastName:</th>
                                <Input
                                    value={userDetails.lastName}
                                    style={{
                                        width: 150,
                                    }}
                                    placeholder="Last Name" />
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>Gender:
                        <td>
                            <Radio.Group onChange={onRadioChecked} value={radioValue}>
                                <Radio value={"male"}>Male</Radio>
                                <Radio value={"female"}>Female</Radio>
                            </Radio.Group>
                        </td>
                    </th>
                </tr>
                <tr>
                    <th>Email:
                        <td>
                            <Input
                                value={userDetails.email}
                                style={{
                                    width: 300,
                                }}
                                placeholder="Email" />
                        </td>
                    </th>
                </tr>
                <tr>
                    <td style={{ textAlign: "center" }}>
                        <Button onClick={onLogOutClick}
                            type="primary">
                            Log Out
                        </Button>
                    </td>
                </tr>
            </table>
        </div>
    )
}
