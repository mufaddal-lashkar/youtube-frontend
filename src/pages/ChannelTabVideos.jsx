import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../conf";
import axios from "axios";
import {VideoCardChannelTab} from "../components/index"

const ChannelTabVideos = () => {

    const {channelId} = useParams()
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

    

    return(
        <div className="wrapper w-full h-[calc(100%_-_94px)] overflow-y-scroll flex flex-col">
            <div className="flex flex-wrap justify-center md:justify-start py-10 space-x-0 md:space-x-3">
                {videos?(
                    videos.map((video) => {
                        return <div key={video._id} className="m-2">
                        <VideoCardChannelTab 
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
                        </div>
                    })
                ):(
                    <></>
                )}
            </div>
        </div>
    )
}

export default ChannelTabVideos