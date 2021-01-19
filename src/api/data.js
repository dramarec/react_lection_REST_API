import axios from "axios";

export const addProduct = async (product) => {
    try {
        const response = await axios.post(
            `https://react-rest-api-29d05-default-rtdb.firebaseio.com/product.json`,
            product
        );
        console.log(response);
        // return response;
        return { id: response.data.name, ...product };
    } catch (error) {
        return error;
    }
};
export const getProducts = async () => {
    try {
        const response = await axios.get(
            `https://react-rest-api-29d05-default-rtdb.firebaseio.com/product.json`
        );
        if (!response.data) {
            return [];
        }

        // const keys = Object.keys(response.data);
        // console.log(keys);
        // const result = keys.map((key) => ({
        //     id: key,
        //     ...response.data[key],
        // }));
        // return console.log(response.data);
        //
        // refactoring---
        const result = Object.keys(response.data).map((item) => ({
            id: item,
            ...response.data[item],
        }));
        // console.log("keys :", result);item
        return result;
        //
    } catch (error) {
        // return error;
        throw new Error(error);
    }
};

// какая разница между этими функциями?
// export const addProduct = (product) => {
//     try {
//         axios
//             .post(
//                 `https://react-rest-api-29d05-default-rtdb.firebaseio.com/product.json`,
//                 product
//             )
//             .then((data) => console.log(data));
//     } catch (error) {
//         console.log(error);
//     }
// };

export const deleteProduct = async (id) => {
    try {
        return await axios.delete(
            `https://react-rest-api-29d05-default-rtdb.firebaseio.com/product/${id}.json`
        );
    } catch (error) {
        throw new Error(error);
    }
};

export const updateProduct = async (product) => {
    const editedProduct = { ...product };
    delete editedProduct.id;
    console.log(editedProduct);
    try {
        return await axios.put(
            `https://react-rest-api-29d05-default-rtdb.firebaseio.com/product/${product.id}.json`,
            editedProduct
        );
    } catch (error) {
        throw new Error(error);
    }
};
