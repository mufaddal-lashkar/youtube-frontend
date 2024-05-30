import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { server } from "../conf";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {HomeVideo} from "../components/index"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const ChannelTabHome = () => {

    const {channelId} = useParams()

    // function to get videos
    const [videos, setVideos] = useState()
    useEffect(() => {
        getVideos()
    },[channelId])
    const getVideos = async () => {
        const apiUrl = `${server}/videos/c/${channelId}`
        await axios.get(apiUrl)
        .then((res) => {
            setVideos(res.data.data);
            console.log(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // function to handle see all
    const navigate = useNavigate();
    const location = useLocation();  
    const handleReplaceHomeWithVideos = () => {
        const currentPath = location.pathname;
        const newPath = currentPath.replace('/home', '/videos');
        navigate(newPath);
    };

    return(
        <div className="w-full">
            <div className="videos space-y-4">
                <div className="videos-texts flex justify-between">
                    <p className="text-lg font-medium text-[#272727]">Videos</p>
                    <button className="text-sm text-[#065fd4] font-medium" onClick={() => handleReplaceHomeWithVideos()}>See All</button>
                </div>
                <div className="videos-display inline-flex space-x-4">
                    {videos?(
                        videos.map((video) => {
                            return <HomeVideo
                                key={video._id} 
                                thumbnail={video.thumbnail}
                                title={video.title}
                                duration={video.duration}
                                views={video.views}
                                uploaded={video.createdAt}
                                channelName={video.owner.username}
                                avatar={video.owner.avatar}
                                videoId={video._id} 
                                />
                            })
                        ):(
                            <div className="container w-full h-24 flex justify-center ">
                                <p>No videos found of this channel</p>
                            </div>
                        )}
                </div>
            </div>
            <div className="shorts space-y-4">
            
            </div>  
        </div>
    )
}

export default ChannelTabHome