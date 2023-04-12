import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAProduct } from "../../../store/product";
import './CreateProductForm.css'
function CreateProductForm() {
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [url, setUrl] = useState("");
    const [detail, setDetail] = useState("");
    const [price, setPrice] = useState("");
    const history = useHistory();
    const [errors, setErrors] = useState([]);
  

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const payload = { title, detail, price, url, imageUrl };

        let data = await dispatch(addAProduct(payload));

        console.log(payload, 'payload')
        if (data.errors) {
            setErrors([...Object.values(data.errors)]);
        } else {
            history.push("/");
        }
    };

    return (
        <>
        <section className="create-product-form">
            <form className="create-form max-h-full w-full sticky inset-0 hidden lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20 " onSubmit={handleSubmit} encType="multipart/form-data">
            <h1 className="create text-center mb-10 font-bold text-3xl lg:text-4xl">Create your Product!</h1>
                <ul>
                    {errors.map((error, idx) => (
                        <li className="edit-errors  border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700" key={idx}>
                            {error}
                        </li>
                    ))}
                </ul>

                <label className="input-label text-black ml-0">
                    Title
                    <input 
                        type="text"
                        className="product-input w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>

                <label className="input-label text-black ml-0">
                Product Details
                    <input 
                        type="text"
                        className="product-input w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        value={detail}
                        required
                        onChange={(e) => setDetail(e.target.value)}
                    />
                </label>

                <label >
                    Price
                    <input
                        type="integer"
                        className="product-input w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        value={price}
                        required
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>



                <label >
                    Link
                    <input
                        type="text"
                        className="product-input w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        value={url}
                        required
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </label >

                <label >
                Upload Image
                <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageUrl(e.target.files[0])}
                className="product-input w-full text-gray-900  p-2 rounded-lg focus:outline-none focus:shadow-outline"
                />
                

            </label>

                <button className="mt-5 text-sm create-button bg-rose-500" type="submit">
                    Create new Product!
                </button>
            </form>
        </section>
        </>
    );
}

export default CreateProductForm;
