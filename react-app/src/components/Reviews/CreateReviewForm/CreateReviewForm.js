import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSingleProduct } from "../../../store/product";
import { addAReview } from "../../../store/review";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal } from "../../Login-SignUp/context/Modal";
import { useParams } from "react-router-dom";
function CreateReviewForm({ product }) {
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [hoverStars, setHoverStars] = useState(0);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const [isShown, setIsShown] = useState(false);

    const { closeModal } = useModal();

    const {productId} = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const payload = { review, stars, imageUrl };

        let data = await dispatch(addAReview(payload, product.id));

      
        dispatch(getSingleProduct(product.id));

        if (data.errors) {
            setErrors([...Object.values(data.errors)]);
        } else {
            closeModal();
        }

        setReview("");
        setStars(0);
        setImageUrl("");
    };

  
    return (
        <section className="create-product-form ">
        <form className="create-form" onSubmit={handleSubmit}>
        <h1 className="create text-rose-500 text-center mb-10 font-bold text-3xl lg:text-4xl">Create your Review!</h1>
        <ul>
                {errors.map((error, idx) => (
                    <li className="edit-errors border  border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"  role="alert" key={idx}>
                   
                        {error}

                        
                    </li>
                ))}
            </ul>

            <label>
                Review

                
                <textarea
                type="text"
                className="w-full h-32  bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            
                placeholder="Leave a review... "
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

            <label
            className=''
            >Stars</label>


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

            <button className="create-button bg-rose-500 ml-0" type="submit">
                Create Your Review!
            </button>
        </form>
    </section>
);
}

export default CreateReviewForm;
