import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
 import {AiOutlineDownCircle} from "react-icons/ai"
// import { faStar } from "@fortawesome/free-solid-svg-icons";
import './Navigation.css'

import down from '../../../images/down.png'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
  
      <div onClick={openMenu} className="fill-red-400" ><AiOutlineDownCircle/></div>
 
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="text-transparent text-l bg-clip-text bg-gradient-to-r from-red-400 to-pink-600">
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
            { user.isBrand &&  (
            <li>Brand Name: {user.brandName}</li>
            )
            }{!user.isBrand &&  (
              <li>Name: {user.firstName} {user.lastName}</li>
              )

            }
          
            <li>
              <button className='button' onClick={handleLogout}>Log Out</button>
            </li>
          </div>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
             
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
             
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
