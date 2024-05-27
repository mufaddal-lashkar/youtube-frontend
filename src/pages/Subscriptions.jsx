import React, {useEffect, useRef, useState} from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import '../App.css'
import { server } from "../conf";
import axios from "axios";
import SubscribedChannelAvatar from "../components/SubscribedChannelAvatar";

const Subscriptions = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    // get data of subscribed channel from db
    const [subscribedChannel, setSubscribedChannel] = useState([])
    const getSubscribedChannels = async () => {
        const userId = user?.user._id
        const apiUrl = `${server}/subscriptions/u/${userId}`
        await axios.get(apiUrl)
        .then((res) => {
            console.log(res.data.data);
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

    return (
        <div className="container h-full w-full overflow-x-hidden overflow-y-scroll">
            <div className="crousal-container space-x-1 w-full h-[94px] flex justify-center items-center">
                <button onClick={scrollLeft} className="rounded-full h-11 w-11 text-2xl flex justify-center items-center bg-black bg-opacity-5 hover:bg-opacity-10"><IoIosArrowBack  /></button>
                <div ref={carouselRef} className="crousal w-[85%] h-[74px] flex overflow-x-scroll overflow-y-hidden">
                    {subscribedChannel?.map((item) => {
                        return <SubscribedChannelAvatar key={item._id} username={item.username} avatar={item.avatar} />
                    })}
                </div>
                <button onClick={scrollRight} className="rounded-full h-11 w-11 text-2xl flex justify-center items-center bg-black bg-opacity-5 hover:bg-opacity-10"><IoIosArrowForward /></button>
            </div>
        </div>
    )
}

export default Subscriptions