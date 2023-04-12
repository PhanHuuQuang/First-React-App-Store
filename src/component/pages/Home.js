import React, { useState, useEffect } from "react";
// import { message } from "antd";
import { getAllProducts } from "../API";
import '../css/HomePage.css'
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../product/AddToCartButton";
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import { Carousel } from "antd";
import banner from "../image/banner-slide3.jpg"
import banner2 from "../image/banner-slide.jpg"
import banner3 from "../image/banner-slide2.jpg"
// import ScrollButton from "../other component/ScrollButton";

export default function Home() {
    const [items, setItems] = useState([]);
    //Fetch all products
    useEffect(() => {
        getAllProducts().then((res) => {
            setItems(res.products);
        });
    }, []);

    const navigate = useNavigate();

    //onClick Shop Now
    const onClickShopNow = () => {
        navigate('/all-products');
    }

    const onShopClick = (value) => {
        const name = value.target.className;
        if (name === "fragrances") {
            navigate(`/${name}`);
        }
        else if (name === "mens-shirts") {
            navigate(`/${name}`);
        }
        else {
            navigate(`/${name}`);
        }
    }

    //Code for navigate to product detail
    const onClickImage = (value) => {
        navigate('/product-detail')
        sessionStorage.setItem('itemdetail', JSON.stringify(value));
        console.log(value);
    }

    //Style image in carousel
    const contentStyle = {
        position: 'absoluted',
        height: '510px',
        width: '100%',
        background: '#364d79',

        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <>
            {/* <head>
                <title>My E-commerce Homepage</title>
                <link rel="stylesheet" type="text/css" href="style.css" />
            </head> */}
            <body>
                {/* <header>
                    <div class="logo">
                        <a href="#"><img src="logo.png" alt="My E-commerce Site" /></a>
                    </div>
                    <nav>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Shop</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                    <div class="cart">
                        <a href="#"><img src="cart.png" alt="Shopping Cart" /></a>
                    </div>
                </header> */}
                {/* <section className="banner" >
                    <h1>Welcome to My E-commerce Site</h1>
                    <p>Shop the latest trends in fashion and accessories.</p>
                    <a className="btn" onClick={onClickShopNow}>Shop Now</a>
                </section> */}
                <section className="banner" style={{ backgroundColor: "white" }}>
                    <Carousel
                        autoplay
                        arrows
                        style={{ width: "80vw" }}
                        prevArrow={<LeftCircleFilled />}
                        nextArrow={<RightCircleFilled />}
                    >
                        <div className="banner-primary">
                            <h1>Welcome to My E-commerce Site</h1>
                            <p>Shop the latest trends in fashion and accessories.</p>
                            <a className="btn" onClick={onClickShopNow}>Shop Now</a>
                        </div>
                        <div>
                            <img style={contentStyle} src={banner} />
                        </div>
                        <div>
                            <img style={contentStyle} src={banner2} />
                        </div>
                        <div>
                            <img style={contentStyle} src={banner3} />
                            {/* <img style={contentStyle} src={banner3} /> */}
                        </div>
                    </Carousel>
                </section>
                <section className="products">
                    <h2>Featured Products</h2>
                    {items.map((products) => (
                        <div key={products.id} className="product">
                            <img onClick={() => onClickImage(products)}
                                src={products.thumbnail}
                                style={{ height: 200, cursor: "pointer" }}
                                alt="Product 1" />
                            <h3>{products.title}</h3>
                            <p className="price">${products.price}</p>
                            <a className="btn">
                                <AddToCartButton item={products} />
                            </a>
                        </div>
                    ))}
                </section>
                <footer>
                    <div className="footer-col">
                        <h4>Shop</h4>
                        <ul onClick={onShopClick}>
                            <li><a className="mens-shirts" >Men's Fashion</a></li>
                            <li><a className="womens-dresses" >Women's Fashion</a></li>
                            <li><a className="fragrances" >Fragrances</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>About Us</h4>
                        <ul>
                            <li><a href="#">Our Story</a></li>
                            <li><a href="#">Meet the Team</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Follow Us</h4>
                        <ul className="social-links">
                            <li><a href="https://www.facebook.com/"><i className=""></i></a></li>
                            <li><a href="https://twitter.com/"><i className=""></i></a></li>
                            <li><a href="https://www.instagram.com/"><i className=""></i></a></li>
                        </ul>
                    </div>
                </footer>
            </body>
        </>
    )
}