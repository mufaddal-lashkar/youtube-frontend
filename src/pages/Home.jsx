import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getVideos } from "../store/VideosSlice"
import { logoutUser } from "../store/UserSlice";
import { HomeVideo } from "../components";

const Home = () => {

    // getting user from localstorage
    const getUser = () => {
        let user = localStorage.getItem('user')
        if(user) {
            user = JSON.parse(user);
        } else {
            user = null;
        }
        return user;
    }
    const [user, setUser] = useState(getUser())

    // configure 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // function to handle logout
    const handleLogout = () => {
        dispatch(logoutUser())
        .then((res) => console.log(res))
        navigate('/login')
        
    }
    

    // const [videos, setVideos] = useState(JSON.parse(localStorage.getItem('videos')))
    // console.log(videos);
    
    // const getHomeVideos = () => {   
    //     dispatch(getVideos(page))
    // }
    // getHomeVideos()
    // console.log(page);

    // Initialize videos state as an empty array
    const [videos, setVideos] = useState([]); 
    const [page, setPage] = useState(1)

    useEffect(() => {
        const getHomeVideos = () => {
            dispatch(getVideos(page))
                .then((response) => {
                    console.log(response.payload);
                    setVideos(response.payload)
                })
                .catch((error) => {
                    console.error("Error fetching videos:", error);
                });
        };
        getHomeVideos();
        console.log(videos);
    }, [dispatch, page]);

    
    
    
    return (
        <div className="wrapper w-[100%] h-[100vh] overflow-y-scroll flex flex-col">
            <div className=" py-10 flex flex-wrap space-x-3 justify-center">
                {/* <button onClick={getHomeVideos}>Click</button>
                <button onClick={handleLogout}>Logout</button> */}
                {
                    videos?.map((vid) => {
                        return <HomeVideo 
                                key={vid._id} 
                                thumbnail={vid.thumbnail} 
                                title={vid.title} 
                                duration={vid.duration}
                                channelName={vid.owner[0].username}
                                avatar={vid.owner[0].avatar}
                                views={vid.views}
                                uploaded={vid.createdAt}
                                />
                    })
                }
                <button onClick={() => {
                    setPage(page + 1)
                    getHomeVideos()
                    window.location.reload()
                }}>Show more</button>
            </div>
        </div>
    )
}

export default Home