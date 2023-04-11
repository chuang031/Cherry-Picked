import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllProducts } from "../../../store/product";
import cherry from '../../../images/cherry.png'
import './ProductHomePage.css'
import { getAllUsers } from "../../../store/user";
import { getAllCustomers } from "../../../store/customer";

const ProductHomePage = ({product, query}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => Object.values(state.product));
    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllCustomers())
        
    }, [dispatch]);
   
  
    const sessionUser = useSelector(state => state.session.user);
   
    const navigateToCreateProductForm = async (e) => {
        history.push("/productform");
    };
    return (
        <div className="h-fit p-5 font-serif text-transparent text-center bg-clip-text bg-gradient-to-r from-red-400 to-pink-600 " >
     
            <a  href='https://github.com/chuang031/CherryPicked'>
            <h1 >  © 2023 Cherry Picked | About Me </h1>
            </a>
            <div>
           
            </div>



            <div className="button-container m-10">
            {sessionUser.isBrand &&(
				<button
					className="create-products"
					onClick={navigateToCreateProductForm}
				>
					Create Product
				</button>
				)
				}

                {!(sessionUser.isBrand) &&(
                    <div className="h-fit p-5 font-serif text-transparent text-center text-l bg-clip-text bg-gradient-to-r from-red-400 to-pink-600">* You must be a Brand to create new products! *</div>
                    
                )}
                </div>

            <div className="products ">

            {(product.length && query !== '')&& (product.map(({ id, imageUrl, title, price }, idx) => (
                <div key={id} className={'medium'}>

                <NavLink  className= 'link' to ={`/products/${id}`}>
                    <div className="img-container">
                        <img className="card_img" src={imageUrl}></img>
                       
                        <div className="title font-serif ">{title} ${(Math.round(price * 100)/100)}</div>
            </div>
           
                    </NavLink>
                </div>
         
            )))}

            {((!product.length) || (query === '')) && (allProducts.map(({ id, imageUrl, title, price }, idx) => (
                <div key={id} className={'medium'}>

                <NavLink  className= 'link' to ={`/products/${id}`}>
                    <div className="img-container">
                        <img className="card_img" src={imageUrl}></img>
                       
                        <div className="title font-serif ">{title} ${(Math.round(price * 100)/100)}</div>
            </div>
           
                    </NavLink>
                </div>
         
            )))}

            </div>
       
        </div>
    );
};

export default ProductHomePage;
