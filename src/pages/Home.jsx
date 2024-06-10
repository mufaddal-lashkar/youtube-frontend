import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getVideos } from "../store/VideosSlice"
import { logoutUser } from "../store/UserSlice";
import { HomeVideo } from "../components";

const Home = () => {

    // getting user from localstorage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    // configure 
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
                    <div className=" py-10 flex flex-wrap">
                        {/* {
                            videos?.map((vid) => {
                                return <HomeVideo 
                                        key={vid._id} 
                                        thumbnail={vid.thumbnail} 
                                        title={vid.title} 
                                        duration={vid.duration}
                                        channelName={vid.owner.username}
                                        avatar={vid.owner.avatar}
                                        views={vid.views}
                                        uploaded={vid.createdAt}
                                        videoId={vid._id}
                                        />
                            })
                        } */}
                    </div>
                </div>
    )
}

export default Home