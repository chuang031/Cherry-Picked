import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getProductReview } from "../../../store/review";
import { deleteAReview } from "../../../store/review";
import { getSingleProduct } from "../../../store/product";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProductReviewsList.css";
import OpenModalButton from "../../Login-SignUp/OpenModalButton";
import { getOneUserThunk } from "../../../store/user";
import { loadOtherUsers } from "../../../store/user";
import EditReviewForm from "../EditReviewForm/EditReviewForm";

import CreateReviewForm from "../CreateReviewForm/CreateReviewForm";
const ProductReviewslist = ({ product }) => {
    const allProducts = useSelector((state) => Object.values(state.product));
    const { productId } = useParams();
    const currentUser = useSelector((state) => state.session.user);
    const allUsers = useSelector((state) => Object.values(state.customer));
    const sessionUser = useSelector((state) => state.session.user);
    const [isShown, setIsShown] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const allProductReviews = useSelector((state) =>
        Object.values(state.review)
    );
    const specificReviews = allProductReviews.filter(
        (review) => review.productId === product.id
    );

    // const specificReviewCustomers = allUsers.map(
    //     (user) =>
    // )
  

    useEffect(() => {
        // setReviews(specificReviews)
        // if(spot !== undefined){
        dispatch(getProductReview(product.id));

        // .then(res=>setReviews(res.spotReviews))
    }, [product.id, dispatch]);

    const deleteReview = async (e, id) => {
        e.preventDefault();
        dispatch(deleteAReview(id));
        dispatch(getSingleProduct(product.id));

        history.push(`/products/${product.id}`);
    };

    const editReview = async (e, id) => {
        e.preventDefault();
        history.push(`/products/${product.id}/reviews/${id}/update`);
    };

    //    const message = (num) => {
    //     if (num === 1) {
    //         return "Cherry hates this";
    //     } else if (num === 2) {
    //         return "Cherry thinks its alright";
    //     } else if (num === 3) {
    //         return "Cherry says OK";
    //     } else if (num === 4) {
    //         return "Cherry's good with it";
    //     } else if (num === 5) {
    //         return "Cherry Picked!";
    //     } else {
    //         return null;
    //     }
    // };

    const findAvg = (rating) => {
        let total = 0;
        for (let i = 0; i < rating.length; i++) {
            total += rating[i];
        }
        let avg = total / rating.length;
    };
    let total = 0;

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <h2 class="text-xl font-bold sm:text-2xl">Customer Reviews</h2>
            {!sessionUser.isBrand && (
                <div class="mt-">
                    <OpenModalButton
                        buttonText="Create Review"
                        modalComponent={<CreateReviewForm product={product} />}
                    />
                </div>
            )}
            <div class="mt-4 flex items-center gap-4">
                <p class="text-3xl font-medium">
                    <span class="sr-only"> Average review score </span>
                </p>
                <p class="mt-0.5 text-xs text-gray-500">
                    Total of {specificReviews.length} reviews
                </p>
            </div>
            <section>
                <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div class="[column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
                        {specificReviews?.map(
                            ({ review, stars, customerId, imageUrl, id }) => (
                                <div className="mb-8 sm:break-inside-avoid">
                                    <span key={review}>
                                        <div className="review-list font-serif rounded-xl bg-gray-50 p-6 shadow ">
                                            {Array.from(
                                                { length: 5 },
                                                (_, index) => {
                                                    const value = index + 1;

                                                    return (
                                                        <span className="stars">
                                                            {isShown &&
                                                            value <= stars ? (
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    color="#ffc107"
                                                                    key={value}
                                                                />
                                                            ) : !isShown &&
                                                              value <= stars ? (
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    color="#ffc107"
                                                                    key={value}
                                                                />
                                                            ) : (
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    color="#e4e5e9"
                                                                />
                                                            )}
                                                        </span>
                                                    );
                                                }
                                            )}
                                            <div className>
                                                {stars} out of 5 stars
                                            </div>
                                            <div className="review-rev mt-2 font-medium sm:mt-0">
                                                Review: {review}
                                            </div>
                                            {imageUrl && (
                                                <div>
                                                    <div> Review Picture:</div>
                                                    <img
                                                        className="rev-img "
                                                        src={imageUrl}
                                                    ></img>
                                                </div>
                                            )}

                                            {currentUser.id === customerId && (
                                                <span class="inline-flex divide-x overflow-hidden rounded-md border bg-white shadow-sm">
                                                    <button
                                                        class="inline-block p-2 text-gray-700 hover:bg-gray-50 focus:relative"
                                                        title="Edit Product"
                                                        onClick={(e) =>
                                                            editReview(e, id)
                                                        }
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
                                                    </button>

                                                    <button
                                                        class="inline-block p-2 text-gray-700 hover:bg-gray-50 focus:relative"
                                                        title="Delete Product"
                                                        onClick={(e) =>
                                                            deleteReview(e, id)
                                                        }
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
                                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            )}
                                        </div>

                                        <div class="mt-4 flex items-center gap-4">
                                            {allUsers.map((user) =>
                                                user.id === customerId ? (
                                                    <>
                                                        <img
                                                            className=" w-12 h-12 rounded-full border border-gray-100 shadow-sm "
                                                            src={
                                                                !user.imageUrl
                                                                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-5Ga9DOBo0Xl-QkZK8TmKUH0IOcLmn4t_wTNzOIgBQPET6MM1uk8BI7v69cQ1nBNwJs&usqp=CAU"
                                                                    : user.imageUrl
                                                            }
                                                        ></img>
                                                        <div class="text-sm">
                                                            <p class="font-medium">
                                                                {user.firstName}{" "}
                                                                {user.lastName}
                                                            </p>
                                                            <p>Customer</p>
                                                            
                                                        </div>
                                                    </>
                                                ) : null
                                            )}
                                        </div>
                                    </span>
                                </div>
                            )
                        )}

                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductReviewslist;
