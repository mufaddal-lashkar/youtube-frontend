import React,{useState, useEffect} from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { server } from "../conf";
import axios from "axios";
import { BiBell, BiSolidBellRing } from "react-icons/bi";
import { LuDot } from "react-icons/lu";

const ChannelPage = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const { channelId } = useParams()
    const [channel, setChannel] = useState({});
    const [videos, setVideos] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isBelled, setIsBelled] = useState(true);
        
    useEffect(() => {
        if (channelId) {
            getChannelInfo();
            getVideos();
            currentUserIsSubscribed();
        }
    }, [channelId]);
        
        const getChannelInfo = async () => {
            try {
                const apiUrl = `${server}/users/c/${channelId}`;
                const response = await axios.get(apiUrl);
                setChannel(response.data.data);
            } catch (error) {
                console.error("Error fetching channel info:", error);
            }
        };
        
        const getVideos = async () => {
            try {
                const apiUrl = `${server}/videos/c/${channelId}`;
                const response = await axios.get(apiUrl);
                setVideos(response.data.data);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };
        
    const handleSubscription = async () => {
        try {
            const data = { userId: user?.user._id };
            const apiUrl = `${server}/subscriptions/c/${channelId}`;
            await axios.post(apiUrl, data);
            getChannelInfo();
            currentUserIsSubscribed();
        } catch (error) {
            console.error("Subscription error:", error);
        }
    };
        
        const currentUserIsSubscribed = async () => {
            try {
                const apiUrl = `${server}/subscriptions/isSubscribed/${channelId}`;
                const data = { userId: user?.user._id };
                const response = await axios.post(apiUrl, data);
                setIsSubscribed(response.data.data);
                setIsBelled(response.data?.message[0]?.isBelled || false);
            } catch (error) {
                console.error("Error checking subscription status:", error);
            }
        };
        
        const handleBellToggle = async () => {
            try {
                const userId = user?.user._id;
                const apiUrl = `${server}/subscriptions/u/${userId}/c/${channelId}`;
                const response = await axios.post(apiUrl);
                setIsBelled(response.data.data.isBelled);
            } catch (error) {
                console.error("Bell toggle error:", error);
            }
        };
        
    return (
        <div className="container w-[100%] h-[100vh] px-14 overflow-y-scroll">
            <div className="coverImg-container w-full h-[200px] rounded-xl overflow-hidden">
                <img className="w-[100%] h-full" src={channel?.coverImage} alt="coverImg" />
            </div>
            <div className="channel-info flex justify-center items-center w-full h-[210px] my-4">
                <div className="avatar-container h-[180px] w-[180px] bg-black flex justify-center items-center rounded-full overflow-hidden">
                    <img className="w-full" src={channel?.avatar} alt="avatar" />
                </div>
                <div className="info w-[calc(100%_-_180px)] h-full flex flex-col justify-center px-4">
                    <p className="text-3xl font-bold">{channel?.username}</p>
                    <div className="flex text-sm text-[#606060] space-x-1 mt-3">
                        <p>{channel?.email}</p> 
                        <span className="flex justify-center items-center"><LuDot /></span>
                        <p>{channel?.subscribersCount} subscribers</p> 
                        <span className="flex justify-center items-center"><LuDot /></span>
                        <p>{videos?.length} videos</p>
                    </div>
                    <button
                        onClick={handleSubscription}
                        className={`${
                            isSubscribed
                                ? 'bg-[#000000] bg-opacity-5 hover:bg-opacity-10 text-black w-[120px] justify-around'
                                : 'bg-[#000000] w-[84px] text-white'
                            } text-xs mt-5 h-8 rounded-full font-semibold flex justify-center items-center px-2`}
                    >
                        {isSubscribed ? (
                            isBelled ? (
                                <div className="flex items-center">
                                    <BiSolidBellRing className="mr-1 text-base" onClick={(e) => {
                                        e.stopPropagation();
                                        handleBellToggle();
                                    }} />
                                    <span>Unsubscribe</span>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <BiBell className="mr-1 text-base" onClick={(e) => {
                                        e.stopPropagation();
                                        handleBellToggle();
                                    }} />
                                    <span>Unsubscribe</span>
                                </div>
                            )
                        ) : (
                            'Subscribe'
                        )}
                    </button>
                </div>
            </div>
            <div className="tabs flex space-x-6">
                <NavLink to={"home"} className={({ isActive }) => `${isActive ? "font-semibold text-[#272727] border-b-2 border-[#272727]" : "text-[#272727]"} `}>
                    <h1>Home</h1>
                </NavLink>
                <NavLink to={"videos"} className={({ isActive }) => `${isActive ? "font-semibold text-[#272727] border-b-2 border-[#272727]" : "text-[#272727]"} pb-4`}>
                    <h1>Videos</h1>
                </NavLink>
                <NavLink to={"shorts"} className={({ isActive }) => `${isActive ? "font-semibold text-[#272727] border-b-2 border-[#272727]" : "text-[#272727]"} pb-4`}>
                    <h1>Shorts</h1>
                </NavLink>
                <NavLink to={"playlists"} className={({ isActive }) => `${isActive ? "font-semibold text-[#272727] border-b-2 border-[#272727]" : "text-[#272727]"} pb-4`}>
                    <h1>Playlists</h1>
                </NavLink>
                <NavLink to={"tweets"} className={({ isActive }) => `${isActive ? "font-semibold text-[#272727] border-b-2 border-[#272727]" : "text-[#272727]"} pb-4`}>
                    <h1>Tweets</h1>
                </NavLink>
                <NavLink to={"community"} className={({ isActive }) => `${isActive ? "font-semibold text-[#272727] border-b-2 border-[#272727]" : "text-[#272727]"} pb-4`}>
                    <h1>Community</h1>
                </NavLink>
            </div>
            <hr className="h-[1.5px] w-full bg-[#ccc] mb-4"/>
            <div className="w-full overflow-hidden">
                <Outlet />  
            </div>
        </div>
    )
}

export default ChannelPage