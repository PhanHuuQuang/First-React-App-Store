import { Card, List, Image, Rate, Typography, Badge, Select } from "antd";
import Search from "antd/es/input/Search";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllProducts, getProductByCategory, searchProducts } from "../API";
import '../css/AppProduct.css'
import AddToCartButton from "./AddToCartButton";


export default function Product() {
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('az');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const param = useParams();

    //Get products
    useEffect(() => {
        setLoading(true);
        (param?.categoryId
            ? getProductByCategory(param.categoryId)
            : getAllProducts()
        ).then((res) => {
            setItems(res.products);
            setLoading(false);
        });
    }, [param]);


    //Code for Sorted Items
    //Run when each time sortOrder change state
    useEffect(() => {
        //Create clone a array items
        const sortedItems = [...items];
        sortedItems.sort((a, b) => {
            //Lowercase title
            const aLowerCaseTitle = a.title.toLowerCase();
            const bLowerCaseTitle = b.title.toLowerCase();
            //Sort to a->z, z->a, low->high, high->low
            //Use state sortOrder get value and comparison for each order sort
            if (sortOrder === "az") {
                return aLowerCaseTitle > bLowerCaseTitle ? 1 : aLowerCaseTitle === bLowerCaseTitle ? 0 : -1
            }
            else if (sortOrder === "za") {
                return aLowerCaseTitle < bLowerCaseTitle ? 1 : aLowerCaseTitle === bLowerCaseTitle ? 0 : -1
            }
            else if (sortOrder === "lowHigh") {
                return a.price > b.price ? 1 : a.price === b.price ? 0 : -1
            }
            else if (sortOrder === "highLow") {
                return a.price < b.price ? 1 : a.price === b.price ? 0 : -1
            }
        });
        //When sort done set state "items" by value sorted
        setItems(sortedItems)
    }, [sortOrder])

    //Search product
    const onSearchProduct = (value) => {
        setLoading(true);
        searchProducts(value).then((res) => {
            setItems(res.products);
            setLoading(false);
        })
    }

    //Code for navigate to product detail
    const onClickImage = (value) => {
        navigate('/product-detail')
        sessionStorage.setItem('itemdetail', JSON.stringify(value));
    }

    //Code for Sorted Items
    // const getSortedItems = () => {
    //     const sortedItems = [...items];
    //     sortedItems.sort((a, b) => {
    //         //Lowercase title
    //         const aLowerCaseTitle = a.title.toLowerCase();
    //         const bLowerCaseTitle = b.title.toLowerCase();
    //         if (sortOrder === "az") {
    //             return aLowerCaseTitle > bLowerCaseTitle ? 1 : aLowerCaseTitle === bLowerCaseTitle ? 0 : -1
    //         }
    //         else if (sortOrder === "za") {
    //             return aLowerCaseTitle < bLowerCaseTitle ? 1 : aLowerCaseTitle === bLowerCaseTitle ? 0 : -1
    //         }
    //         else if (sortOrder === "lowHigh") {
    //             return a.price > b.price ? 1 : a.price === b.price ? 0 : -1
    //         }
    //         else if (sortOrder === "highLow") {
    //             return a.price < b.price ? 1 : a.price === b.price ? 0 : -1
    //         }
    //     });
    //     return sortedItems;
    // };

    //Render
    return (
        <div className="productsContainer">
            {/* Item Sorted */}
            <div>
                <Typography.Text>View Items Sorted By : </Typography.Text>
                <Select
                    // Get value when choose sort 
                    onChange={(value) => {
                        //Set a value to state 
                        setSortOrder(value)
                    }}
                    defaultValue={''}
                    options={[
                        {
                            label: 'Choose sort order',
                            value: ''
                        },
                        {
                            label: 'Alphabet A -> Z',
                            value: 'az'
                        },
                        {
                            label: 'Alphabet Z -> A',
                            value: 'za'
                        },
                        {
                            label: 'Price Low->High',
                            value: 'lowHigh'
                        },
                        {
                            label: 'Price High->Low',
                            value: 'highLow'
                        }
                    ]}></Select>

                {/* Search Item */}
                <div style={{ float: "right" }}>
                    <Search
                        onSearch={onSearchProduct}
                        allowClear
                        style={{ width: 280, paddingRight: '8px' }}
                        placeholder="Search here..."
                    />
                </div>
            </div>

            {/* List Product */}
            <List
                loading={loading}
                grid={{
                    gutter: 16, xs: 1, sm: 1, md: 4, lg: 4, xl: 3, xxl: 3,
                }}
                pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "30", "50"],
                    position: "bottom",
                    align: "center"

                }}
                renderItem={(product, index) => {
                    return (
                        <Badge.Ribbon className="itemCardBadge"
                            text={`${product.discountPercentage}% Off`}>
                            <Card

                                className="itemCard"
                                title={product.title}
                                key={index}
                                cover={
                                    <Image onClick={() => onClickImage(product)} className="itemCardImage" src={product.thumbnail}></Image>
                                }
                                actions={[
                                    <Rate allowHalf disabled value={product.rating} />,
                                    <AddToCartButton item={product} />
                                ]}>
                                <Card.Meta title={
                                    <Typography.Paragraph>
                                        Price: ${product.price}{" "}
                                        <Typography.Text delete type="danger">
                                            ${parseFloat(product.price + ((product.price * product.discountPercentage) / 100)).toFixed(2)}
                                        </Typography.Text>
                                    </Typography.Paragraph>
                                }
                                    description={<Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                                        {product.description}
                                    </Typography.Paragraph>}
                                ></Card.Meta>
                            </Card>
                        </Badge.Ribbon>
                    )
                }}
                // dataSource={getSortedItems()}
                dataSource={items}
            >
            </List>
        </div>
    )
}