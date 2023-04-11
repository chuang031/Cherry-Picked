import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { authenticate } from "./store/session";
import SignupFormPage from "./components/Login-SignUp/SignupFormPage";
import LoginFormPage from "./components/Login-SignUp/LoginFormPage";
import Navigation from "./components/Login-SignUp/Navigation";
import ProductHomePage from "./components/Products/ProductHomePage/ProductHomePage";
import CreateProductForm from "./components/Products/CreateProductForm/CreateProductForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProductDetailPage from "./components/Products/ProductDetailPage/ProductDetailPage";
import EditProductForm from "./components/Products/EditProductForm/EditProductForm";
import EditReviewForm from "./components/Reviews/EditReviewForm/EditReviewForm";
import ProfilePage from "./components/Profile/Profile";
import { getAllCustomers } from "./store/customer";
import { getProductReview } from "./store/review";
import { getAllProducts } from "./store/product";
import ProductReviewslist from "./components/Reviews/ProductReviewsList/ProductReviewsList";
function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [product,setProduct] = useState([])
    const [query, setQuery] = useState("")
    useEffect(() => {
        dispatch(authenticate()).then(() => setIsLoaded(true));
       dispatch(getAllCustomers())
       dispatch(getProductReview())
       dispatch(getAllProducts())
    }, [dispatch]);


 
    return (
        <>
            <Navigation isLoaded={isLoaded} product={product} setProduct={setProduct} query={query} setQuery={setQuery} />
            {isLoaded && (
                <Switch>
                    <Route path="/login">
                        <LoginFormPage />
                    </Route>

                    <Route path="/signup">
                        <SignupFormPage />
                    </Route>

                    <ProtectedRoute exact path="/">
                        <ProductHomePage product={product} query={query} />
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/profile">
                <ProfilePage/>
                </ProtectedRoute>

                    <ProtectedRoute exact path="/productform">
                        <CreateProductForm />
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/products/:productId">
                    <ProductDetailPage />
                </ProtectedRoute>

                <ProtectedRoute exact path="/products/:productId/reviews">
                <ProductReviewslist />
            </ProtectedRoute>

                <ProtectedRoute exact path="/products/:productId/update">
                <EditProductForm />
            </ProtectedRoute>

            <ProtectedRoute exact path="/products/:productId/reviews/:reviewId/update">
            <EditReviewForm />
        </ProtectedRoute>

                </Switch>
            )}
        </>
    );
}

export default App;
