import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../conf";
import { Comment } from "../components";

const Video = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))) 
    const [videoId, setVideoId] = useState();
    const [video, setVideo] = useState();
    const [channelSub, setChannelSub] = useState([])
    const [commentText, setCommentText] = useState("")
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [comments, setComments] = useState([])
    const [commentPage, setCommentPage] = useState(1)

    // function to extract video id from url
    useEffect(() => {
        const extractVideoIdFromUrl = () => {
        const currentUrl = window.location.href;
        const questionMarkIndex = currentUrl.indexOf('?');
        const queryString = currentUrl.slice(questionMarkIndex + 1);
        setVideoId(queryString)
        };
        extractVideoIdFromUrl();
    }, []);
    
    // function to get video by id
    useEffect(() => {
        if(videoId) {
            getVideoById(videoId)
        }
    },[videoId])
    const getVideoById = async (videoId) => {
        try {
            const apiUrl = `${server}/videos/v/${videoId}`
            const response = await axios.get(apiUrl)
            // console.log(response.data.data);
            setVideo(response.data.data)
        } catch (error) {
            console.error("Error fetching video:", error);
        }
    }

    // function to get channel subscribers
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
                // console.log(response.data.data);
                setChannelSub(response.data.data)
            } catch (error) {
                console.log("Error while fetching subscribers", error);
            }
        }
    }

    // function to get all comments
    const getVideoComments = async () => {
        if(video) {
            try {
                const apiUrl = `${server}/comments/${videoId}?page=${commentPage}&limit=25`
                const response = await axios.get(apiUrl)
                // console.log(response.data.data);
                setComments(response.data.data)
            } catch (error) {
                console.log("Error while fetching comments", error);
            }
        }
    }

    // fuction to get data when video is uploaded
    function getTimeDifference(createdAt) {
        const createdAtDate = new Date(createdAt);
        const nowDate = new Date();
        const timeDiffMs = nowDate - createdAtDate;
        
        const seconds = Math.floor(timeDiffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);
        
        if (years >= 1) {
            return { value: years, unit: 'year' + (years > 1 ? 's' : '') };
        } else if (months >= 1) {
            return { value: months, unit: 'month' + (months > 1 ? 's' : '') };
        } else if (weeks >= 1) {
            return { value: weeks, unit: 'week' + (weeks > 1 ? 's' : '') };
        } else if (days >= 1) {
            return { value: days, unit: 'day' + (days > 1 ? 's' : '') };
        } else if (hours >= 1) {
            return { value: hours, unit: 'hour' + (hours > 1 ? 's' : '') };
        } else if (minutes >= 1) {
            return { value: minutes, unit: 'minute' + (minutes > 1 ? 's' : '') };
        } else {
            return { value: seconds, unit: 'second' + (seconds > 1 ? 's' : '') };
        }
    }
    const ago = getTimeDifference(video?.createdAt);

    // function to disable comment post button if input is empty
    useEffect(() => {
        if(commentText !== "") {
            setSubmitDisabled(false)
        } else {
            setSubmitDisabled(true)
        }
    }, [commentText])

    // function to post comment
    const postComment = async () => {
        const apiUrl = `${server}/comments/${videoId}`
        const data = await {
            "content": commentText,
            "userId": user.user._id
        }
        const response = await axios.post(apiUrl, data)
        console.log(response.data.data);
        setCommentText("")
    }
    useEffect(() => {
        getVideoComments()
    },[video, postComment])
    
    return ( 
        <div className="container h-[100vh] w-full flex overflow-y-scroll overflow-x-hidden">
            <div className="left-panel h-full w-[70%] p-6">
                <div className="video-container rounded-2xl overflow-hidden w-ful">
                    <video src={video?.videoFile} alt="Video" controls autoPlay className="w-full"></video>
                </div>
                <div className="video-info text-sm mt-2 text-[#262626]">
                    <p className="text-base font-bold ">{video?.title}</p>
                    <div className="channel-options w-full flex justify-between my-2 h-11">
                        <div className="channel-info flex h-full items-center w-fit">
                            <img className="w-[38px] h-[38px] rounded-full" src={video?.owner.avatar} alt="channel-avatar" />
                            <div className="flex flex-col justify-center mx-3">
                                <p className="font-medium">{video?.owner.username}</p>
                                <p className="text-xs text-[#606060]">{channelSub?.length}<span className="mx-2">subscribers</span></p>
                            </div>
                            <button className="w-[74px] text-xs h-7 rounded-full font-semibold text-white flex justify-center items-center bg-[#272727] px-2">Subscribe</button>
                        </div>
                        <div className="options flex space-x-2 h-full text-xs w-fit items-center">
                            <div className="like-dislike flex">
                                <button className="w-16 h-7 bg-[#000000] bg-opacity-5 hover:bg-opacity-10 flex justify-center items-center rounded-l-full"><i className="fa-regular fa-thumbs-up "></i></button>
                                <button className="w-12 h-7 bg-[#000000] bg-opacity-5 hover:bg-opacity-10 flex justify-center items-center rounded-r-full border-l border-[#ccc]"><i className="fa-regular fa-thumbs-down "></i></button>
                            </div>
                            <button className="w-[68px] h-7 rounded-full flex justify-center space-x-3 items-center bg-[#000000] bg-opacity-5 hover:bg-opacity-10"><i className="fa-solid fa-share"></i><span>Share</span></button>
                            <button className="w-[92px] h-7 rounded-full flex justify-center space-x-3 items-center bg-[#000000] bg-opacity-5 hover:bg-opacity-10"><i className="fa-solid fa-download"></i><span>Download</span></button>
                            <button className="w-[68px] h-7 rounded-full flex justify-center space-x-3 items-center bg-[#000000] bg-opacity-5 hover:bg-opacity-10"><i className="fa-regular fa-bookmark"></i><span>Save</span></button>
                            <button className="w-7 h-7 rounded-full flex justify-center items-center bg-[#000000] bg-opacity-5 hover:bg-opacity-10"><i className="fa-solid fa-ellipsis"></i></button>
                        </div>
                    </div>
                    <div className="video-description bg-[#000000] bg-opacity-5 w-full h-auto p-2 rounded-xl text-xs text-[#0f0f0f] mt-3">
                        <span className="font-bold mr-3">{video?.views} views</span><span className="font-bold mr-3">{`${ago.value} ${ago.unit} ago`}</span><br />
                        {video?.description}
                    </div>
                    <div className="video-comments w-full h-auto mt-5">
                        <p className="font-bold text-lg">{comments.length} Comments</p>
                        <div className="add-comment w-full h-auto flex my-4">
                            <img className="w-[38px] h-[38px] rounded-full" src={user?.user.avatar} alt="avatar" />
                            <div className="w-[calc(100%_-_38px)] px-4 space-y-3">
                                <input value={commentText} onChange={(e) => setCommentText(e.target.value)} type="text" className="w-full outline-none border-b border-[#747474]"/>
                                <div className="flex items-center justify-end">
                                    <button className="w-[74px] h-9 bg-white rounded-full hover:bg-[#000000] hover:bg-opacity-10">Cancel</button>
                                    <button disabled={submitDisabled} onClick={postComment} className="w-[93px] h-9 bg-[#065fd4] font-medium text-white disabled:font-normal disabled:text-black disabled:bg-black disabled:bg-opacity-5 rounded-full">Comment</button>
                                </div>
                            </div>
                        </div>
                        <div className="all-comments">
                            {comments?.map((com) => {
                                return <Comment 
                                    key={com._id}
                                    content={com.content}
                                    username={com.owner.username}
                                    avatar={com.owner.avatar}
                                    ownerId ={com.owner._id}
                                    createdAt={com.createdAt}
                                    likes={com.likes}
                                    />
                            })}
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