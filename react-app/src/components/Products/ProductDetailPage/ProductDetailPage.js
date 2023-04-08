import React, { useEffect, useState } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteAProduct, getSingleProduct } from "../../../store/product";
import CreateReviewForm from "../../Reviews/CreateReviewForm/CreateReviewForm";
import ProductReviews from "../../Reviews/ProductReviewsList/ProductReviewsList";
import ProductReviewslist from "../../Reviews/ProductReviewsList/ProductReviewsList";
import { getOneUserThunk } from "../../../store/user";
import OpenModalButton from "../../Login-SignUp/OpenModalButton";
import EditReviewForm from "../../Reviews/EditReviewForm/EditReviewForm";

function ProductDetailPage() {
    const { productId } = useParams();
    // const allProducts = useSelector((state)=> state.product)
    // const specificProduct = allProducts[productId]
    const sessionUser = useSelector((state) => state.session.user);
    //    const productAuthor = useSelector(state=> state.user[specificProduct.brandId])
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSingleProduct(productId));
    }, [productId, dispatch]);

    const { product, productAuthor } = useSelector((state) => {
        const product = state.product[productId];
        const productAuthor = state.user[product?.brandId];

        return {
            product,
            productAuthor,
        };
    });

    const deleteProduct = (e) => {
        e.preventDefault();
        dispatch(deleteAProduct(productId));
        history.push(`/`);
    };

    useEffect(() => {
        if (product?.brandId && !productAuthor) {
            dispatch(getOneUserThunk(product.brandId));
        }
    }, [product, productAuthor]);

    if (!product) return null;

    return (
        <div>
            <section>
                <div class="mx-auto px-4 py-8 sm:px-6 lg:px-4">
                    <div class="grid grid-cols-1 lg:h-screen lg:grid-cols-2 max-h-96 ">
                        <div class="relative lg:py-16 -z-10 ">
                            <div class="relative h-64 sm:h-80 lg:h-full">
                                <img
                                    alt="Product"
                                    src={product?.imageUrl}
                                    class=" absolute inset-0 h-full w-full object-contain "
                                />
                            </div>
                        </div>

                        <div class="relative flex justify-center ">
                            <span class=""></span>

                            <div class="overflow-hidden rounded-lg shadow transition hover:shadow-lg p-14">
                                <h2 class="bg-slate-100 py-1 px-2 text-rose-500 uppercase tracking-wide text-sm font-bold inline-block rounded shadow mb-10">
                                    {productAuthor?.brandName}
                                </h2>
                                <article>
                                    <h1 class="text-slate-900 text-center mb-10 font-bold text-3xl lg:text-4xl">
                                        {" "}
                                        {product?.title}{" "}
                                    </h1>

                                    <div class="text-slate-600 text-center mb-10 leading-relaxed">
                                        Product Details: {product?.detail}
                                    </div>

                                    <div class="text-slate-900 text-center font-bold text-2xl">
                                        Price: $
                                        {(Math.round(product?.price * 100) / 100).toFixed(2)}
                                    </div>
                                    <div class="text-rose-500 text-center font-medium p-3 dark:text-rose-500 hover:underline">
                                        Link:{" "}
                                        <a href={product?.url}>
                                            {product?.title}{" "}
                                        </a>
                                    </div>

                                  
                                </article>

                                <div class='flex justify-center'>
                                    {(sessionUser?.isBrand && (sessionUser?.id === productAuthor?.id))&& (
                                        <div class="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1 mr-1">
                                        <Link to={`/products/${product?.id}/update`}>
                                        <button
                                            class="inline-flex items-center
                                            gap-2 rounded-md px-4 py-2 text-sm
                                            text-gray-500 hover:text-gray-700
                                            focus:relative"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="h-4 w-4"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                            Edit
                                        </button>
                                        </Link>
                                        </div>
                                    )}

                                    {(sessionUser?.isBrand && (sessionUser?.id === productAuthor?.id) )&& (
                                        <div class="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                                        <button
                                            onClick={deleteProduct}
                                            class="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="h-4 w-4"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                            Delete
                                        </button>
                                        </div>
                                    )}
                                </div>
                               
                            </div>

                         
                        </div>

                     
                    </div>
                    {!sessionUser.isBrand && (
                        <h2 className="h-fit mt-14 font-serif text-transparent  text-center text-l bg-clip-text bg-gradient-to-r from-red-400 to-pink-600">
                            *Only Brands can delete or edit a
                            Product*
                        </h2>
                    )}
                </div>
            </section>

            <div class="">
                {sessionUser.isBrand && (
                    <h2 className="h-fit mt-14 font-serif text-transparent text-center text-l bg-clip-text bg-gradient-to-r from-red-400 to-pink-600">
                     
                        * You must be a Customer to Create a Review! *
                    </h2>
                )}
            </div>
            <ProductReviewslist product={product} />
        </div>
    );
}

export default ProductDetailPage;
