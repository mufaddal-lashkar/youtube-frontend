import React from "react";
import { LuDot } from "react-icons/lu";
import { Link } from "react-router-dom";

const VideoCardRelatedVideo = ({
    thumbnail,
    title,
    duration,
    avatar,
    channelName,
    views,
    uploaded,
    videoId
}) => {

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
    const ago = getTimeDifference(uploaded);

    // function to convert seconds into mins
    function secondsToMinutes(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} : ${remainingSeconds}`
    }
    const  minAndSec = secondsToMinutes(duration)

    return(
        <Link to={`/video/${videoId}`} className="container w-full h-[94px] flex overflow-hidden pl-2 py-3 hover:bg-black hover:bg-opacity-10 rounded-xl">
            <div className="thumbnail w-[50%] h-[72px] relative overflow-hidden rounded-xl">
                <img src={thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
                <div className="duration m-2 absolute right-0 bottom-0 bg-[#252525] flex justify-center items-center text-xs text-white rounded-lg">
                <p>{minAndSec}</p>
                </div>
            </div>
            <div className="details w-[60%] h-[72px] flex flex-col px-2 justify-around">
                <p className="text-sm line-clamp-2 font-medium">{title} </p>
                <div className="">
                    <p className="text-xs text-[#606060]">{channelName}</p>
                    <p className="text-xs flex text-[#606060]"><span>{views} views</span><span className="flex justify-center items-center"><LuDot /></span><span>{`${ago.value} ${ago.unit} ago`}</span></p>
                </div>
            </div>
        </Link>
    )
}

export default VideoCardRelatedVideo