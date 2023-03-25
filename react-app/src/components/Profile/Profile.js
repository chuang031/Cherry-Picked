import React, { useEffect, useState } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ProfilePage(){
    const sessionUser = useSelector(state => state.session.user)

    return (
        <div>
        <div> <img src={!(sessionUser?.imageUrl) ?  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-5Ga9DOBo0Xl-QkZK8TmKUH0IOcLmn4t_wTNzOIgBQPET6MM1uk8BI7v69cQ1nBNwJs&usqp=CAU': sessionUser.imageUrl}></img></div>


        {!(sessionUser.isBrand) && (
        <h1> {sessionUser.firstName} {sessionUser.lastName}</h1>
        )}

        {sessionUser.isBrand && (
            <h1> {sessionUser.brandName} </h1>
        )}
        <div>{sessionUser.username}</div>
        <div>{sessionUser.email}</div>

        {!(sessionUser.isBrand) && (
        <div>{sessionUser.about}</div>
        )}
        </div>
    )
}

export default ProfilePage