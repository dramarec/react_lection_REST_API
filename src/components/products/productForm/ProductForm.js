import React, { useState } from "react";

const initialState = {
    name: "",
    price: "",
};

const ProductForm = ({
    addProductItem,
    editedProduct = {},
    submitedEditedProduct = false,
}) => {
    const [product, setProduct] = useState({
        ...initialState,
        ...editedProduct,
    });

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        submitedEditedProduct
            ? submitedEditedProduct(product)
            : addProductItem(product);
        setProduct({ ...initialState });
    };

    return (
        <form onSubmit={onHandleSubmit}>
            <label>
                Name:{" "}
                <input
                    type="text"
                    name="name"
                    onChange={onHandleChange}
                    // почему здесь через product.??
                    value={product.name}
                />
            </label>
            <label>
                Price:{" "}
                <input
                    type="text"
                    name="price"
                    onChange={onHandleChange}
                    // почему здесь через product.??/
                    value={product.price}
                />
            </label>
            <button type="submit">
                {submitedEditedProduct ? "Edit" : "Add"}
            </button>
        </form>
    );
};

export default ProductForm;
