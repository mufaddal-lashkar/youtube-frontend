import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getVideos } from "../store/VideosSlice"
import { logoutUser } from "../store/UserSlice";

const Home = () => {

    const getUser = () => {
        let user = localStorage.getItem('user')
        if(user) {
            user = JSON.parse(user);
        } else {
            user = null;
        }
        return user;
    }

    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    // useEffect(() => {
        const getHomeVideos = () => {   
            dispatch(getVideos(page))
                .then((result) => {
                    if(result.payload) {
                        console.log(result);
                    }
                })
        }
    // },)
 
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logoutUser())
        .then((res) => console.log(res))
        navigate('/login')
        
    }
    
    const [user, setUser] = useState(getUser())
    // console.log(user);
    // useEffect(() => {
    //     if(!user) {
    //         navigate("/login")
    //     }
    // },[])


    return (
        <>
            <div className="wrapper w-[100%] grid-cols-3 grid-rows-3 gap-10 h-[100vh] overflow-y-scroll bg-slate-300 flex flex-col justify-center items-center">
                <button onClick={getHomeVideos}>Click</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    )
}

export default Home