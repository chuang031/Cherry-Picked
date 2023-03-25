import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import { signUp } from "../../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [is_brand, setIs_Brand] = useState(false);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [brandName, setBrandName] = useState("")
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
  
        if (password === confirmPassword) {
            const data = await dispatch(
                signUp(username, email, password, firstName, lastName, brandName, is_brand)
         
            );
            if (data) {
                setErrors(data);
            } else {
                closeModal();
            }
        } else {
            setErrors([
                "Confirm Password field must be the same as the Password field",
            ]);
        }
      
    };

    return (
        <div className = "signup-modal font-serif ">

     
       
            <h1 className="card mt-7">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors.map((error, idx) => (
                        <li
                        className="errors border  border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
                        key={idx}>{error}</li>
                    ))}
                </ul>
                <div >
                <label className="checkbox-wrapper-2">
                    Are you a Brand?
                    <input 
                        type="checkbox"
                        className="sc-gJwTLC ikxBAC"
                        value={is_brand}
                        onChange={() => setIs_Brand(!is_brand)}
                    />
                </label>
                </div>

                <label className="input-label">
                    Email
                    <input className="input"
                        type="text"
                        value={email}
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className="input-label">
                    Username
                    <input className="input"
                        type="text"
                        value={username}
                        placeholder='Enter Username'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {!is_brand && (
                    <>
                <label className="input-label">
                    First Name
                    <input className="input"
                        type="text"
                        value={firstName}
                        placeholder="Customer First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                      
                    />
                </label>
                <label className="input-label">
                    Last Name
                    <input className="input"
                        type="text"
                        value={lastName}
                        placeholder="Customer Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                    
                    />
                </label>
                </>
                )}

             

                    {is_brand &&(
                <label className="input-label">
                Brand Name
                <input className="input"
                    type="text"
                    value={brandName}
                    placeholder="Brand Name"
                    onChange={(e) => setBrandName(e.target.value)}
                
                />
            </label>
                )
                    }
                <label className="input-label">
                    Password
                    <input className="input"
                        type="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label className="input-label">
                    Confirm Password
                    <input className="input"
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button className='submit  bg-rose-500' type="submit">Sign Up</button>
            </form>
        
        </div>
    );
}

export default SignupFormModal;
