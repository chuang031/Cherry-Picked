const LOAD_MANY_REVIEWS = "reviews/LOAD_MANY_REVIEWS"

const ADD_REVIEW = "reviews/ADD_REVIEW"

const DELETE_REVIEW = "reviews/DELETE_REVIEW"

const loadReviews = (reviews, productId) =>{
    return{
        type: LOAD_MANY_REVIEWS,
        reviews,
        productId
    }
}

const addReview = (reviews) =>{
    return{
        type: ADD_REVIEW,
        reviews
    }
}

const deleteReview = (reviewId) =>{
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}


export const getProductReview =(productId)=> async(dispatch)=>{
    const response = await fetch(`/api/products/${productId}/reviews/`)

    if (response.ok){
        const data = await response.json()
        dispatch(loadReviews(data, productId))
       return data
    }
}

export const addAReview = (reviews,productId)=> async (dispatch) =>{
    const response = await fetch(`/api/products/${productId}/reviews/`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviews)
    })

   
    if (response.ok){
        const data = await response.json()
        dispatch(addReview(data))
        return data
       
    } else {
        const error = response.json()
        return error
    }
}



export const editAReview = (id, reviewData)=> async (dispatch) =>{
    const response = await fetch(`/api/products/${id}/reviews/`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewData)
    })
    if (response.ok){
        const data = await response.json()
        return data
    } else {
        const error = response.json()
        return error
    }
}



export const deleteAReview = (reviewId) => async (dispatch) =>{
    const response = await fetch(`/api/reviews/${reviewId}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(response.ok){
        dispatch(deleteReview(reviewId))
    }
}

const initalReviews= {}

const reviewsReducer = (state= initalReviews, action) =>{
    let copy = {...state}
    switch(action.type){
        case LOAD_MANY_REVIEWS:
            action.reviews.Reviews.forEach((review)=>{
                copy[review.id]= review

            })
            return copy

        case ADD_REVIEW:
            copy[action.reviews.id] = action.reviews
            return copy

        case DELETE_REVIEW:
            delete copy[action.reviewId]
            return copy
        
        default:
            return state
    }
}

export default reviewsReducer