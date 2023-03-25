import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAProduct } from "../../../store/product";
import { editAReview } from "../../../store/review";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal } from "../../Login-SignUp/context/Modal";

function EditReviewForm(){
const dispatch= useDispatch()
const {reviewId} = useParams()
const {productId} = useParams()
// const oneProduct = useSelector((state)=> state.product)

const { closeModal } = useModal();

const currentUser = useSelector((state)=>state.session.user)
const allProductReviews = useSelector((state)=> state.review)
const specificReview = allProductReviews[reviewId]


const [review, setReview] = useState(specificReview.review)
const [stars, setStars] = useState(specificReview.stars)
const [imageUrl, setImageUrl] = useState(specificReview.imageUrl)
const [errors, setErrors] = useState([]);
const [isShown, setIsShown] = useState(false);
const [hoverStars, setHoverStars] = useState(0)
const history = useHistory();
const allProducts = useSelector((state)=> state.product)
const specificProduct = allProducts[productId]
const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = { review, stars, imageUrl };

    let data = await dispatch(editAReview(reviewId, payload));

    if (data.errors) {
        setErrors([...Object.values(data.errors)]);
    } else {
        history.push(`/products/${specificProduct.id}`);
    }
};

return (
    <section className="create-product-form">
        <form className="create-form" onSubmit={handleSubmit}>
            <h1 className="create text-rose-500 text-center mb-10 font-bold text-3xl lg:text-4xl">Edit your Review!</h1>
            <ul>
                {errors.map((error, idx) => (
                    <li className="edit-errors border border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700" 
                    key={idx}>
                        {error}
                    </li>
                ))}
            </ul>

            <label>
                Review
                <textarea
                    type="text"
                    className="w-full h-32  bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    
                    value={review}
                    required
                    onChange={(e) => setReview(e.target.value)}
                    >
                </textarea>
            </label>

            <label>
                Image Url
                <input
                    type="text"
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </label>

            <label>Stars</label>

            <div>
            {Array.from({ length: 5 }, (_, index) => {
                
                const value = index + 1;
                
                return (
                    <span
                    className='star text-lg align-middle'
                   
                    
                 onClick={() => setStars(value)}

                 onMouseEnter={()=> {
                    setHoverStars(value)
                    setIsShown(true)
                    
                }}
                onMouseLeave={()=>{ 
                    setHoverStars(stars)
                    setIsShown(false)
                }}

                    >
                    
                  
                        {isShown && (value <= hoverStars)? 
                            <FontAwesomeIcon icon={faStar } 
                            
                            color="#ffc107" 
                           
                            key={value}

                            />:
                            !isShown && (value  <= stars)?
                            <FontAwesomeIcon icon={faStar } 
                            
                            color="#ffc107" 
                           
                            key={value}
                            />
                            : <FontAwesomeIcon icon={faStar} 
                            color="#e4e5e9"
                           
                           
                            /> }

                            

                        

                    
                    </span>
                );
            })}
            <p>{hoverStars} out of 5 stars</p>
           
        </div>


            <button className="create-button bg-rose-500" type="submit">
                Edit Your Review!
            </button>
        </form>
    </section>
);
}
export default EditReviewForm