import React, {useEffect, useRef, useState} from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { TbFaceIdError, TbError404  } from "react-icons/tb";
import '../App.css'
import { server } from "../conf";
import axios from "axios";
import SubscribedChannelAvatar from "../components/SubscribedChannelAvatar";
import { HomeVideo } from "../components";

const Subscriptions = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    // get data of subscribed channel from db
    const [subscribedChannel, setSubscribedChannel] = useState([])
    const getSubscribedChannels = async () => {
        const userId = user?.user._id
        const apiUrl = `${server}/subscriptions/u/${userId}`
        await axios.get(apiUrl)
        .then((res) => {
            // console.log(res.data.data);
            setSubscribedChannel(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        getSubscribedChannels()
    } , [])


    // functions for crousal
    const carouselRef = useRef(null);
    const scrollLeft = () => {
        if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };
    const scrollRight = () => {
        if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    // get videos of subscribed channels
    const [videos, setVideos] = useState([])
    useEffect(() => {
        getVideos()
    },[user])
    const getVideos = async () => {
        const data = {
            userId: user?.user._id
        }
        const apiUrl = `${server}/videos/getVideosOfSubscribedChannel`
        await axios.post(apiUrl, data)
        .then((res) => {
            // console.log(res.data.data);
            setVideos(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    

    return (
        <>
            {subscribedChannel?(
                <div className="container h-full w-full">
                    <div className="crousal-container space-x-1 w-full h-[94px] flex justify-center items-center">
                        <button onClick={scrollLeft} className="rounded-full h-9 w-9 text-2xl flex justify-center items-center bg-black bg-opacity-5 hover:bg-opacity-10"><IoIosArrowBack  /></button>
                        <div ref={carouselRef} className="crousal w-[85%] h-[74px] flex overflow-x-scroll overflow-y-hidden">
                            {subscribedChannel?.map((item) => {
                                return <SubscribedChannelAvatar key={item._id} username={item.username} avatar={item.avatar} channelId={item._id} />
                            })}
                        </div>
                        <button onClick={scrollRight} className="rounded-full h-9 w-9 text-2xl flex justify-center items-center bg-black bg-opacity-5 hover:bg-opacity-10"><IoIosArrowForward /></button>
                    </div>
                    <div className="wrapper w-[100%] h-[calc(100%_-_94px)] overflow-y-scroll flex flex-col">
                    <div className=" py-10 flex flex-wrap space-x-3">
                        {videos?.map((vid) => {
                            return <HomeVideo 
                                    key={vid._id}
                                    thumbnail={vid.thumbnail}
                                    title={vid.title}
                                    duration={vid.duration}
                                    avatar={vid.owner.avatar}
                                    channelName={vid.owner.username}
                                    views={vid.views}
                                    uploaded={vid.createdAt}
                                    videoId={vid._id}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
            ):(
                <div className="container w-[100%] h-[100%] space-y-3 flex flex-col justify-center items-center">
                    <div className="flex text-8xl space-x-4"> 
                        <TbFaceIdError />
                        <TbError404 />
                    </div>
                    <h1 className="text-[#272727] font-semibold text-3xl">You have not subscribed any channels yet </h1>
                </div>
            )}
        </>
    )
}

export default Subscriptions