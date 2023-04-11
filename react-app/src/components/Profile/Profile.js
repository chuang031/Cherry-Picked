import React, { useEffect, useState } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ProfilePage() {
    const sessionUser = useSelector((state) => state.session.user);
    const [imageUrl, setImageUrl] = useState("");

    return (
        <div class>
            <div class="container mx-auto pt-80 px-4">
                <div class=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                    <div class="flex flex-wrap justify-center items-center">
                        <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                            <div class="relative">
                                <img
                                    class="shadow-l rounded-full h-48 w-48"
                                    src={
                                        !sessionUser?.imageUrl
                                            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-5Ga9DOBo0Xl-QkZK8TmKUH0IOcLmn4t_wTNzOIgBQPET6MM1uk8BI7v69cQ1nBNwJs&usqp=CAU"
                                            : sessionUser.imageUrl
                                    }
                                ></img>
                            </div>
                        </div>
                    </div>
                    
                    <div class='flex items-center justify-center'>
                    <label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageUrl(e.target.files[0])}
                    
                    />
                    </label>
              
                    </div>
                    <div class="text-center mt-12">
                        <h3 class="text-3xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                            {!sessionUser.isBrand && (
                                <h1>
                                    {" "}
                                    {sessionUser.firstName}{" "}
                                    {sessionUser.lastName}
                                </h1>
                            )}
                        </h3>
                        <div class="text-3xl leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                            {sessionUser.isBrand && (
                                <h1> {sessionUser.brandName} </h1>
                            )}
                        </div>
                        <div class="flex justify-center items-center ">
                            {/*
            <div class="flex justify-center py-4 lg:pt-4 pt-8">
              <div class="mr-4 p-3 text-center">
                <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">0</span><span class="text-sm text-blueGray-400">Friends</span>
              </div>
              <div class="mr-4 p-3 text-center">
                <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">0</span><span class="text-sm text-blueGray-400">Photos</span>
              </div>
              <div class="lg:mr-4 p-3 text-center">
                <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">0</span><span class="text-sm text-blueGray-400">Comments</span>
              </div>
            </div>
            */}
                        </div>
                        <div class="mb-2 text-blueGray-600 mt-10">
                            {sessionUser.username}
                        </div>
                        <div class="mb-2 text-blueGray-600"></div>
                        {sessionUser.email}
                    </div>
                    <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <div class="flex flex-wrap justify-center">
                            <div class="w-full lg:w-9/12 px-4">
                                {!sessionUser.isBrand && (
                                    <div>{sessionUser.about}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                <div class="container mx-auto px-4">
                    <div class="flex flex-wrap items-center md:justify-between justify-center">
                        <div class="w-full md:w-6/12 px-4 mx-auto text-center"></div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default ProfilePage;
