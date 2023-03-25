import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAProduct } from "../../../store/product";

function EditProductForm(){
const dispatch= useDispatch()
const {productId} = useParams()

const allProducts = useSelector((state)=> state.product)
const specificProduct = allProducts[productId]


const [title, setTitle] = useState(specificProduct.title);
const [imageUrl, setImageUrl] = useState(specificProduct.imageUrl);
const [url, setUrl] = useState(specificProduct.url);
const [detail, setDetail] = useState(specificProduct.detail);
const [price, setPrice] = useState(specificProduct.price);
const [errors, setErrors] = useState([]);

const history = useHistory();

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = { title, detail, price, url, imageUrl };

    let data = await dispatch(editAProduct(productId, payload));

    if (data.errors) {
        setErrors([...Object.values(data.errors)]);
    } else {
        history.push(`/products/${specificProduct.id}`);
    }
};

return (
    <section className="create-product-form">
        <form className="create-form max-h-full w-full sticky inset-0 hidden lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20 " onSubmit={handleSubmit}>
            <h1 className="create text-center mb-10 font-bold text-3xl lg:text-4xl">Update your Product!</h1>
            <ul>
                {errors.map((error, idx) => (
                    <li className="edit-errors  border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700" key={idx}>
                        {error}
                    </li>
                ))}
            </ul>

            <label>
                Title
                <input
                    type="text"
                    className="product-input w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <label>
                Product Details
                <input
                    type="text"
                    className="product-input w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    value={detail}
                    required
                    onChange={(e) => setDetail(e.target.value)}
                />
            </label>

            <label>
                Price
                <input
                    type="integer"
                    className="product-input w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                />
            </label>

            <label>
                Image Url
                <input
                    type="text"
                    className="product-input w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    value={imageUrl}
                    required
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </label>

            <label>
                Link
                <input
                    type="text"
                    className="pin-input w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    value={url}
                    required
                    onChange={(e) => setUrl(e.target.value)}
                />
            </label>
            <button className="create-button mt-5 text-sm bg-rose-500" type="submit">
                Edit Your Product!
            </button>
        </form>
    </section>
);
}
export default EditProductForm