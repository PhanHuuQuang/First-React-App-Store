import { Button, Card, Image, InputNumber, Modal, Rate, Typography, message } from "antd";
import { useState } from "react";
import AppCheckout from "../header/AppCheckout";
import AddToCartButton from "../product/AddToCartButton";

export default function AppProductDetail() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const productDetail = JSON.parse(sessionStorage.getItem('itemdetail'));

    const showBuyProduct = () => {
        setIsModalOpen(true);
    }

    const handleOk = () => {
        message.success("Your order has been placed successfully.");
        setIsModalOpen(false);

    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    return (
        <div>
            <Card title={productDetail.title}>
                <Card.Grid style={{ width: "40%" }}>
                    <Image className="productImage" src={productDetail.thumbnail}></Image>
                </Card.Grid>
                <Card.Grid style={{ width: "60%" }}>
                    <Typography.Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
                        <b>Description:</b>
                        <br />
                        {productDetail.description}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        <b>Price:</b> ${productDetail.price}{" "}
                        <Typography.Text delete type="danger">
                            ${parseFloat(productDetail.price + ((productDetail.price * productDetail.discountPercentage) / 100)).toFixed(2)}
                        </Typography.Text>
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        <b>Stock:</b> {productDetail.stock}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        <b>Rating:</b> <Rate disabled allowHalf value={productDetail.rating}></Rate>
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        <b>Quantity: </b> <InputNumber className="quantity" min={1} max={10} defaultValue={1}></InputNumber>
                    </Typography.Paragraph>
                    <button className="btnCart">
                        <AddToCartButton item={productDetail}></AddToCartButton>
                    </button>
                    {/* Modal Buy Product */}
                    <button className="btnBuy">
                        <Button type="link" onClick={showBuyProduct}>Buy Now</Button>
                        <Modal title="Buy Product"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                                <AppCheckout></AppCheckout>
                            ]}>
                            <div style={{ marginLeft: 60, width: 350 }}>
                                <Card
                                    className="itemCard"
                                    title={productDetail.title}

                                    cover={
                                        <Image className="itemCardImage" src={productDetail.thumbnail}></Image>
                                    }>
                                    <Card.Meta title={
                                        <Typography.Paragraph>
                                            Price: ${productDetail.price}{" "}
                                            <Typography.Text delete type="danger">
                                                ${parseFloat(productDetail.price + ((productDetail.price * productDetail.discountPercentage) / 100)).toFixed(2)}
                                            </Typography.Text>
                                        </Typography.Paragraph>
                                    }>

                                    </Card.Meta>
                                    <Card.Meta title={
                                        <Typography.Paragraph>
                                        </Typography.Paragraph>
                                    }>
                                    </Card.Meta>
                                </Card>
                            </div>
                        </Modal>
                    </button>
                </Card.Grid>
                {/* <Card.Grid>

                </Card.Grid> */}
            </Card>
        </div >
    )
}