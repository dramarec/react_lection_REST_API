import React, { useState, useEffect } from "react";
import {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct,
} from "../../api/data";
import ProductForm from "./productForm/ProductForm";
import ProductsList from "./productsList/ProductsList";

const initialState = {
    products: [],
    isLoading: false,
    error: "",
    isEditFormOpen: false,
    editedProduct: "",
};

const Products = () => {
    const [state, setState] = useState({ ...initialState });

    // const callback = (result) => {
    //     setState((prev) => ({
    //         ...prev,
    //         products: [...result],
    //     }));
    // };
    const setLoading = () => {
        setState((prev) => ({
            ...prev,
            isLoading: !prev.isLoading,
        }));
    };
    const setEdit = () => {
        setState((prev) => ({
            ...prev,
            isEditFormOpen: !prev.isEditFormOpen,
        }));
    };

    useEffect(() => {
        // setState((prevState) => ({ ...prevState, isLoading: true }));
        setLoading();
        getProducts()
            // .then(callback) как вариант на 22строке
            .then((result) => {
                setState((prev) => ({
                    ...prev,
                    products: [...result],
                }));
            })
            //
            // .catch((error) =>
            //     setState((prev) => ({ prev, error: "Something went wrong" }))
            // )
            .catch((error) => {
                if (error.data) {
                    setState((prev) => ({ ...prev, error: error.data }));
                } else
                    setState((prev) => ({
                        prev,
                        error: "Something went wrong",
                    }));
            })
            .finally(setLoading);
        // .finally(() =>
        //     setState((prevState) => ({
        //         ...prevState,
        //         isLoading: false,
        //     }))
        // );
    }, []);

    const resetError = () => {
        setState((prevState) => ({
            ...prevState,
            error: "",
        }));
    };

    const addProductItem = (product) => {
        resetError();
        // setState((prevState) => ({ ...prevState, isLoading: true }));
        setLoading();
        addProduct(product)
            .then((response) =>
                setState((prev) => ({
                    ...prev,
                    products: [...prev.products, response],
                }))
            )
            .catch((error) => {
                if (error.data) {
                    setState((prev) => ({ ...prev, error: error.data }));
                } else
                    setState((prev) => ({
                        prev,
                        error: "Something went wrong",
                    }));
            })

            .finally(setLoading);
        // .finally(() =>
        //     setState((prevState) => ({
        //         ...prevState,
        //         isLoading: false,
        //     }))
        // );
    };
    const deleteItem = (e) => {
        resetError();
        setLoading();

        const id = e.target.dataset.id;
        deleteProduct(id)
            .then(
                (res) =>
                    res.status === 200 &&
                    setState((prev) => ({
                        ...prev,
                        products: [
                            ...prev.products.filter(
                                (product) => product.id !== id
                            ),
                        ],
                    }))
            )
            .catch((error) => {
                if (error.data) {
                    setState((prev) => ({ ...prev, error: error.data }));
                } else
                    setState((prev) => ({
                        prev,
                        error: "Something went wrong",
                    }));
            })
            .finally(setLoading);
    };
    const editItem = (e) => {
        const id = e.target.dataset.id;
        setEdit();
        setState((prev) => ({
            ...prev,
            editedProduct: prev.products.find((product) => product.id === id),
        }));
        if (state.editedProduct.id) {
            setState((prev) => ({ ...prev, editedProduct: {} }));
        }
    };
    const submitedEditedProduct = (product) => {
        updateProduct(product);
        setState((prev) => ({
            ...prev,
            products: [
                ...prev.products.map((item) =>
                    item.id === state.editedProduct.id ? { ...product } : item
                ),
            ],
            editedProduct: {},
        }));
        setEdit();
    };
    return (
        <div>
            <ProductForm addProductItem={addProductItem} />
            {state.isLoading && <h2>...loading</h2>}
            {state.error && <h2>{state.error}</h2>}
            {state.isEditFormOpen && (
                <ProductForm
                    addProductItem={addProductItem}
                    editedProduct={state.editedProduct}
                    submitedEditedProduct={submitedEditedProduct}
                />
            )}
            {state.products.length ? (
                <ProductsList
                    products={state.products}
                    deleteItem={deleteItem}
                    editItem={editItem}
                    isEditFormOpen={state.isEditFormOpen}
                    editedProduct={state.editedProduct}
                />
            ) : (
                <>{!state.isLoading && <h2>No products</h2>}</>
            )}
        </div>
    );
};

export default Products;
