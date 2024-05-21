import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../conf";
import { Comment } from "../components";

const Video = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))) 

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

    // function to handle video
    const [videoId, setVideoId] = useState();
    const [video, setVideo] = useState();
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

    // function to handle comment
    const [commentText, setCommentText] = useState("")
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [comments, setComments] = useState([])
    const [commentPage, setCommentPage] = useState(1)
    const postComment = async () => {
        const apiUrl = `${server}/comments/${videoId}`
        const data = await {
            "content": commentText,
            "userId": user.user._id
        }
        const response = await axios.post(apiUrl, data)
        console.log(response.data.data);
        setCommentText("")
        getVideoComments()
    }
    const cancelComment = () => {
        setCommentText("")
    }
    useEffect(() => {
        if(commentText !== "") {
            setSubmitDisabled(false)
        } else {
            setSubmitDisabled(true)
        }
    }, [commentText])
    useEffect(() => {
        if(video) {
            getVideoComments()
        }
    },[video])
    const getVideoComments = async () => {
        if(video) {
            try {
                const apiUrl = `${server}/comments/${videoId}?page=${commentPage}&limit=1000`
                const response = await axios.get(apiUrl)
                // console.log(response.data.data);
                setComments(response.data.data)
            } catch (error) {
                console.log("Error while fetching comments", error);
            }
        }
    }
    
    // function to handle subscription
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isBelled, setIsBelled] = useState(true)
    const handleSubscription = async () => {
        const channelId = video?.owner._id
        const data = {
            "userId": user?.user._id
        }
        const apiUrl = `${server}/subscriptions/c/${channelId}`
        const response = await axios.post(apiUrl, data)
        // console.log(response.data.data);
        getChannelInfo()
        currentUserisSubscribed()
    }
    const currentUserisSubscribed = async () => {
        const apiUrl = `${server}/users/isSubscribed/${video?.owner._id}`
        const data = {
            userId: user?.user._id
        }
        const response = await axios.post(apiUrl,data)
        // console.log(response.data.data);
        setIsSubscribed(response.data.data)
    }

    // function to handle channel info
    const [channeInfo, setChannelInfo] = useState()
    const getChannelInfo = async () => {
        const apiUrl = `${server}/users/c/${video?.owner._id}`
        const response = await axios.get(apiUrl)
        // console.log(response.data.data);
        setChannelInfo(response.data.data)
    }
    useEffect(() => {
        getChannelInfo()
        currentUserisSubscribed()
    },[video])

    // function to handle likes
    useEffect(() => {
        getVideoLikes()
    },[video])
    const getVideoLikes = async () => {
        const apiUrl = `${server}/likes/video-likes/v/${videoId}`
        const response = await axios.get(apiUrl)
        console.log(response.data.data);
    }
    const handleVideoLike = async () => {
        
    }

    // functions to handle sharing
    const [showShareModal, setShowShareModal] = useState(false);
    const handleShare = () => {
        setShowShareModal(true)
    }
    const handleCopyUrl = () => {
        const input = document.getElementById("copyUrlInput")
        input.value = window.location.href;
        input.select();
        document.execCommand("copy");
        setShowShareModal(false)
    };
    const handleShareApp = (appname) => {
        const shareUrl = window.location.href;
        const shareTitle = video?.title;
        const appShareUrls = {
            Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
            whatsApp: `whatsapp://send?text=${encodeURIComponent(shareTitle + '\n' + shareUrl)}`
        };
    if (appShareUrls.hasOwnProperty(appName)) {
        window.open(appShareUrls[appName], '_blank');
    } else {
        console.error(`Sharing via ${appName} is not supported.`);
    }
    setShowShareModal(false);
    }
    const handleShareInstagram = () => {
        const isInstagramAppAvailable = /Instagram/.test(navigator.userAgent);
        if (isInstagramAppAvailable) {
            window.location.href = 'instagram://story';
        } else {
            console.error('Instagram app is not available on this device.');
        }
        setShowShareModal(false);
    };

    // customized controls in video player
    const [isEnded, setIsEnded] = useState(false);
    const mainVideo = document.getElementById("main-vid");
    const [customVidControlsOpacity, setCustomVidControlsOpacity] = useState(0)
    const forward10Sec = () => {
        mainVideo.currentTime += 10;
    }
    const backward10Sec = () => {
        mainVideo.currentTime -= 10;
    }
    const handlePlayPause = () => {
        if (mainVideo.paused) {
          mainVideo.play();
          setIsEnded(false)
        } else {
          mainVideo.pause();
        }
    };
    const handleVideoEnded = () => {
        setIsEnded(true);
        setCustomVidControlsOpacity(100)
    };
    const enterVidControlOpacity = () => {
        setCustomVidControlsOpacity(100)
    }
    const leaveVidControlOpacity = () => {
        setCustomVidControlsOpacity(0)
    }
    useEffect(() => {
        if (!mainVideo) return;
        mainVideo.addEventListener('ended', handleVideoEnded);
    
        return () => {
          mainVideo.removeEventListener('ended', handleVideoEnded);
        };
    }, []);
    
    return ( 
        <>
        {showShareModal && (
            <div onClick={() => setShowShareModal(false)} className="wrapper fixed z-10 inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <div onClick={(e) => e.stopPropagation()} className="share-modal z-20 bg-white w-[40%] h-auto rounded-md px-4 relative">
                    <p className="text-base absolute top-3 left-4 font-medium text-[#212121]">Share</p><br />
                    <div className="border-[1px] mt-7 border-[#212121] border-opacity-50 p-2 my-0 space-x-2 rounded-xl ">
                        <input id="copyUrlInput" className="w-[80%] text-[13px] h-9 outline-none" type="text" value={window.location.href} readOnly />
                        <button onClick={() => handleCopyUrl()} className="w-[81px] h-9 bg-[#065fd4] bg-opacity-90 hover:bg-opacity-100 text-white rounded-full font-normal">Copy</button>
                    </div>
                    <div className="apps flex my-4 space-x-4">
                        <button className="w-12 h-12 bg-black bg-opacity-5 text-2xl rounded-lg hover:bg-opacity-10" onClick={() => handleCopyUrl('whatsapp')}><i className="fa-brands fa-whatsapp"></i></button>
                        <button className="w-12 h-12 bg-black bg-opacity-5 text-2xl rounded-lg hover:bg-opacity-10" onClick={() => handleCopyUrl('Instagram')}><i className="fa-brands fa-instagram"></i></button>
                        <button className="w-12 h-12 bg-black bg-opacity-5 text-2xl rounded-lg hover:bg-opacity-10" onClick={() => handleCopyUrl('Telegram')}><i className="fa-brands fa-telegram"></i></button>
                        <button className="w-12 h-12 bg-black bg-opacity-5 text-2xl rounded-lg hover:bg-opacity-10" onClick={() => handleShareInstagram()}><i className="fa-brands fa-twitter"></i></button>
                    </div>
                    <button className="absolute top-1 right-2 text-2xl rounded-full bg-black bg-opacity-5 w-10 h-10 hover:bg-opacity-10" onClick={() => setShowShareModal(false)}>
                            <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        )}
        <div className="container h-[100vh] w-full flex overflow-y-scroll overflow-x-hidden">
            <div className="left-panel h-full w-[70%] p-6">
                <div className="video-container rounded-2xl relative overflow-hidden w-full">
                    <video onMouseLeave={() => leaveVidControlOpacity()} onMouseEnter={() => enterVidControlOpacity()} id="main-vid" controls src={video?.videoFile} alt="Video" autoPlay className="w-full duration-300 ease-in-out"></video>
                    <div onMouseLeave={() => leaveVidControlOpacity()} onMouseEnter={() => enterVidControlOpacity()} className={`additional-controls opacity-${customVidControlsOpacity} absolute top-1/2 transform -translate-y-1/2 w-full h-[30%] p-4 flex items-center justify-evenly`}>
                        <button onClick={() => forward10Sec()} className="text-white text-2xl hover:bg-gray-700 hover:bg-opacity-20 cursor-pointer w-12 h-12 rounded-full flex justify-center items-center">
                            <span><i className="fa-solid fa-backward "></i></span>
                        </button>
                        <button onClick={() => handlePlayPause()} className="text-white text-2xl hover:bg-gray-700 hover:bg-opacity-20 cursor-pointer w-12 h-12 rounded-full flex justify-center items-center">
                            <span>
                                {isEnded ? <i className="fa-solid fa-arrow-rotate-left"></i> : (mainVideo && mainVideo.paused ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>)}
                            </span>
                        </button>
                        <button onClick={() => backward10Sec()} className="text-white text-2xl hover:bg-gray-700 hover:bg-opacity-20 cursor-pointer w-12 h-12 rounded-full flex justify-center items-center">
                            <span><i className="fa-solid fa-forward "></i></span>
                        </button>
                    </div>
                </div>
                <div className="video-info text-sm mt-2 text-[#262626]">
                    <p className="text-base font-bold ">{video?.title}</p>
                    <div className="channel-options w-full flex justify-between my-2 h-11">
                        <div className="channel-info flex h-full items-center w-fit">
                            <img className="w-[38px] h-[38px] rounded-full" src={channeInfo?.avatar} alt="channel-avatar" />
                            <div className="flex flex-col justify-center mx-3">
                                <p className="font-medium">{channeInfo?.username}</p>
                                <p className="text-xs text-[#606060]">{channeInfo?.subscribersCount}<span className="mx-2">subscribers</span></p>
                            </div>
                            <button onClick={handleSubscription} className={`${isSubscribed ? "bg-[#000000] bg-opacity-5 hover:bg-opacity-10 text-black w-[120px] justify-around" : "bg-[#000000] w-[84px]"}  text-xs h-8 rounded-full font-semibold text-white flex justify-center items-center px-2`}>
                                {isSubscribed? (isBelled ? <div  onClick={() => setIsBelled(!isBelled)}><i class="fa-solid fa-bell"></i>Unsubscribe</div> : <><i class="fa-regular fa-bell"></i>Unsubscribe</>) : "Subscribe"}
                            </button>
                        </div>
                        <div className="options flex space-x-2 h-full text-xs w-fit items-center">
                            <div className="like-dislike flex">
                                <button className="w-16 h-7 bg-[#000000] bg-opacity-5 hover:bg-opacity-10 flex justify-center items-center rounded-l-full"><i className="fa-regular fa-thumbs-up "></i></button>
                                <button className="w-12 h-7 bg-[#000000] bg-opacity-5 hover:bg-opacity-10 flex justify-center items-center rounded-r-full border-l border-[#ccc]"><i className="fa-regular fa-thumbs-down "></i></button>
                            </div>
                            <button onClick={handleShare} className="w-[68px] h-7 rounded-full flex justify-center space-x-3 items-center bg-[#000000] bg-opacity-5 hover:bg-opacity-10"><i className="fa-solid fa-share"></i><span>Share</span></button>
                            <a href={video?.videoFile} download className="w-[92px] h-7 rounded-full flex justify-center space-x-3 items-center bg-[#000000] bg-opacity-5 hover:bg-opacity-10"><i className="fa-solid fa-download"></i><span>Download</span></a>
                            <button className="w-[68px] h-7 rounded-full flex justify-center space-x-3 items-center bg-[#000000] bg-opacity-5 hover:bg-opacity-10"><i className="fa-regular fa-bookmark"></i><span>Save</span></button>
                            <button className="w-7 h-7 rounded-full flex justify-center items-center bg-[#000000] bg-opacity-5 hover:bg-opacity-10"><i className="fa-solid fa-ellipsis"></i></button>
                        </div>
                    </div>
                    <div className="video-description bg-[#000000] bg-opacity-5 w-full h-auto p-2 rounded-xl text-xs text-[#0f0f0f] mt-3">
                        <span className="font-bold mr-3">{video?.views} views</span><span className="font-bold mr-3">{`${ago.value} ${ago.unit} ago`}</span><br />
                        {video?.description}
                    </div>
                    <div className="video-comments my-4">
                        <span className="font-semibold text-base">{comments?.length} Comments</span>
                        <div className="add-comment w-full h-auto flex my-4 ">
                            <img className="w-[38px] h-[38px] rounded-full" src={user?.user.avatar} alt="avatar" />
                            <div className="w-[calc(100%_-_38px)] px-4 space-y-3">
                                <input value={commentText} onChange={(e) => setCommentText(e.target.value)} className="border-b outline-none w-full border-[#616161]" type="text" />
                                <div className="buttons flex justify-end">
                                    <button onClick={cancelComment} className="w-[74px] h-[36px] bg-black bg-opacity-5 rounded-full hover:bg-opacity-10">Cancel</button>
                                    <button onClick={postComment} className="w-[93px] h-[36px] rounded-full text-white font-medium bg-[#065fd4] disabled:bg-black disabled:bg-opacity-10 disabled:font-normal disabled:text-black" disabled={submitDisabled} >Comment</button>
                                </div>
                            </div>
                        </div>
                        <div className="all-comments">
                            {comments?.map((com) => {
                                return <Comment 
                                    key={com._id}
                                    content={com.content}
                                    avatar={com.owner.avatar}
                                    username={com.owner.username}
                                    ownerId={com.owner._id}
                                    createdAt={com.createdAt}
                                />
                            })}
                        </div>
                    </div>
                </div> 
            </div>
            <div className="right-panel h-full w-[30%] p-6 bg-slate-600">

            </div>
        </div>
        </>
    )
}

export default Video