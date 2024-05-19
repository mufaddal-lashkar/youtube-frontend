import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../conf";

const Video = () => {

    const [videoId, setVideoId] = useState();
    const [video, setVideo] = useState();

    useEffect(() => {
        const extractVideoIdFromUrl = () => {
        const currentUrl = window.location.href;
        const questionMarkIndex = currentUrl.indexOf('?');
        const queryString = currentUrl.slice(questionMarkIndex + 1);
        setVideoId(queryString)
        };
        extractVideoIdFromUrl();
    }, []);
    
    useEffect(() => {
        if(videoId) {
            getVideoById(videoId)
        }
    },[videoId])

    const getVideoById = async (videoId) => {
        try {
            const apiUrl = `${server}/videos/v/${videoId}`
            const response = await axios.get(apiUrl)
            console.log(response.data.data);
            setVideo(response.data.data)
        } catch (error) {
            console.error("Error fetching video:", error);
        }
    }

    const [channelSub, setChannelSub] = useState([])
    useEffect(() => {
        if(video) {
            getChannelSubs()
        }
    },[video])
    const getChannelSubs = async () => {
        if(video) {
            try {
                const apiUrl = `${server}/subscriptions/c/${video.owner._id}`
                const response = await axios.get(apiUrl)
                console.log(response.data.data);
                setChannelSub(response.data.data)
            } catch (error) {
                console.log("Error while fetching subscribers", error);
            }
        }
    }
    return ( 
        <div className="container h-[100vh] w-full flex overflow-y-scroll overflow-x-hidden">
            <div className="left-panel h-full w-[70%] p-6">
                <div className="video-container rounded-2xl overflow-hidden  w-full bg-slate-200">
                    <video src={video?.videoFile} alt="Video" controls autoPlay className="w-full"></video>
                </div>
                <div className="video-info text-sm mt-3 text-[#262626]">
                    <p className="text-base font-bold ">{video?.title}</p>
                    <div className="channel-options w-full flex justify-between my-2 bg-slate-500 h-11">
                        <div className="channel-info flex h-full w-fit bg-red-400">
                            <img className="w-[44px] h-[44px] rounded-full" src={video?.owner.avatar} alt="channel-avatar" />
                            <div className="flex flex-col justify-center mx-3">
                                <p className="font-medium">{video?.owner.username}</p>
                                <p className="text-xs text-[#606060]">{channelSub?.length}<span className="mx-2">subscribers</span></p>
                            </div>
                        </div>
                        <div className="options flex h-full w-fit">
                            <div className="like-dislike">
                                <button></button>
                                <button></button>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="right-panel h-full w-[30%] p-6 bg-slate-600">

            </div>
        </div>
    )
}

export default Video