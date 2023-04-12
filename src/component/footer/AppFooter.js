import { Typography } from "antd";
import React from "react";
import '../css/AppFooter.css'
function Footer() {
    return (
        <div className="appFooter">
            <Typography.Link href="https://www.google.com" target={'_blank'}>
                Privacy Policy
            </Typography.Link>
            <Typography.Link href="https://www.google.com" target={'_blank'}>
                Terms & Conditions
            </Typography.Link>
            <Typography.Link href="https://www.google.com" target={'_blank'}>
                Return Policy
            </Typography.Link>
            <Typography.Link href="https://www.google.com" target={'_blank'}>
                0989765432
            </Typography.Link>
        </div>
    )
}

export default Footer;