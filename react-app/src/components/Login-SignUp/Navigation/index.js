import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import cherry from '../../../images/cherry.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  } from "@fortawesome/free-solid-svg-icons";
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import { useDispatch } from 'react-redux';  
import * as sessionActions from '../../../store/session'
import {GiCherry} from 'react-icons/gi'
import { login} from '../../../store/session';
import { setSearchbarValue, selectSearchbarValue } from '../../../store/searchbar';
function Navigation({ isLoaded }){
	const location = useLocation();
	const sessionUser = useSelector(state => state.session.user);
   const dispatch= useDispatch()
	const demoUser= (e)=>{
		e.preventDefault()
			const email = "demo@aa.io"
			const password = "password"
		
		
			return dispatch(login(email, password))
		  }

		  const brandUser= (e)=>{
			e.preventDefault()
				const email = "hourglass@aa.io"
				const password = "password"
			
			
				return dispatch(login(email, password))
			  }

	return (
		<div className='main-container'>
			<div className='nav-container'>
			
			<div className='left-side '>
				<NavLink className='cherry w-12' exact to="/">{<img src= {cherry}></img>}</NavLink>
				<NavLink  exact to="/" className="h-fit p-5 font-serif text-transparent text-center text-2xl bg-clip-text bg-gradient-to-r from-red-400 to-pink-600 ">Cherry Picked </NavLink> 

		

			</div>

	<div className='middle-container w-full'>
	<div class="relative ml-8">
	<i class="absolute fa fa-search text-gray-400 top-5 left-4"></i>
	<input type="text" class="bg-gray-100 h-14 w-full px-12 rounded-full focus:outline-none hover:cursor-pointer" name=""></input>
	
  </div>
	</div>

			
			<div className='right-side min-w-min'>

			


		{!sessionUser && (
			
		
	
			<div  >
			  <OpenModalButton 
				buttonText="Log In"
		
				modalComponent={<LoginFormModal />}
			  />
  
			  <OpenModalButton
				buttonText="Sign Up"
			
				modalComponent={<SignupFormModal />}
			  />
			</div >
		
	)}


	{!sessionUser &&(
		<div>
		<button className='button' onClick={demoUser}>Demo Customer</button>	
		<button className='button' onClick={brandUser}>Demo Brand</button>	
</div>
		)}



			{ sessionUser && (
				<div className='profile-container'>
					<NavLink  exact to='/profile'><img className='user-profile' src={!(sessionUser?.imageUrl) ?  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-5Ga9DOBo0Xl-QkZK8TmKUH0IOcLmn4t_wTNzOIgBQPET6MM1uk8BI7v69cQ1nBNwJs&usqp=CAU': sessionUser.imageUrl }></img></NavLink> 
					<ProfileButton className='profile' user={sessionUser} />
					
				</div>
				
			)

			
			
		}
		</div>
		</div>
		
		</div>
		
		
	);
}

export default Navigation;