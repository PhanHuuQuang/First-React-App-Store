export const loginAndGetToken = (username, password) => {
    return (
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                //Property value shortand
                username, // username : username
                password, // password : password
                // expiresInMins: 60, // optional
            })
        })
            .then(res => res.json())
    )
};

export const getAllUser = () => {
    return (
        fetch('https://dummyjson.com/users')
            .then(res => res.json())
    )
};

export const getASingleUser = (userId) => {
    return (
        fetch(`https://dummyjson.com/users/${userId}`)
            .then(res => res.json())
    )
}

export const addAUser = (username, password, firstName, lastName, gender, image) => {
    return (
        fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                image: image,

                /* other user data */
            })
        })
            .then(res => res.json())
    )
}

export const getAllProducts = async () => {
    const res = await fetch('https://dummyjson.com/products');
    return await res.json();
};

export const getProductByCategory = (category) => {
    return (
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then((res) => res.json())
    );
};

export const getASingleProduct = (productId) => {
    return (
        fetch(`https://dummyjson.com/products/${productId}`)
            .then(res => res.json())
    )
}

export const searchProducts = (query) => {
    return (
        fetch(`https://dummyjson.com/products/search?q=${query}`)
            .then(res => res.json())
    )
}

export const getCart = (cartId) => {
    return (
        // fetch(`https://dummyjson.com/carts/${cartId}`).then(res => res.json())
        fetch('https://dummyjson.com/carts/1').then(res => res.json())
    );
};

export const addToCart = async (products) => {
    const res = await fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: 1,
            products: products.map(product => ({
                id: product.id,
                quantity: 1
            }))
        })
    });
    return await res.json();
}

// const authorization = (accessToken) => {
//     return fetch('https://api.escuelajs.co/api/v1/auth/profile', {
//         method: 'GET',
//         headers: {
//             "Authorization": `Bearer ${accessToken}`,
//         }
//     }).then(res => res.json())
//         .then(data => console.log(data));
// };

// const login = (email, password) => {
//     return (
//         fetch('https://api.escuelajs.co/api/v1/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 email,
//                 password
//             })
//         })
//             .then(res => res.json())
//     )
// };

// let accessToken;
// async function api(email, password) {
//     await login(email, password).then(token => {
//         if (token.message === "Unauthorized") {
//             alert("Your password or username wrong")
//         }
//         else {
//             accessToken = token.access_token;
//             // console.log(token.accessToken);
//         }
//     });
//     authorization(accessToken);
// }


// // api("john@mail.com", "changeme");
// api("john@mail.com", "changeme");
