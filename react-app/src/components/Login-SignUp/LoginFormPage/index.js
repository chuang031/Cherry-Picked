import React, { useState } from "react";
import { login } from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <h1 className="log font-serif ">Log In to Cherry Picked!</h1>
      <form onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error, idx) => (
            <li 
            className="errors border  border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
            key={idx}>{error}</li>
          ))}
        </ul>
        <label className="input-label font-serif ">
          Email
          <input className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="input-label font-serif ">
          Password
          <input className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className= 'button  bg-rose-500' type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;
