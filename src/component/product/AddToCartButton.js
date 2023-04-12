import { useState, useEffect } from "react";
import { Button, message } from "antd";

export default function AddToCartButton({ item }) {
    const [loading, setLoading] = useState(false);

    const addProductToCart = () => {
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            //Check when add product not to duplicate
            if (!cart.find((dupItem) => dupItem.id === item.id)) {
                message.success(`${item.title} has been added to cart`);
                // add the item to the cart
                cart.push(item);
                // save the cart to sessionStorage
                sessionStorage.setItem("cart", JSON.stringify(cart));
            }
        }, 1000)
    }
    return <Button type="link" onClick={() => addProductToCart()}
        loading={loading}
        style={{ justifyContent: "center" }}

    >
        Add to Cart
    </Button>;
}
