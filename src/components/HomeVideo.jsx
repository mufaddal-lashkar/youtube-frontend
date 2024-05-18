import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomeVideo = ({
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

    return (
        <Link to={{ pathname: '/video', search: `?videoId=${videoId}` }} className="container w-[300px] h-[320px] text-[10px] block">
            <div className="thumbnail w-full h-[180px] relative overflow-hidden rounded-xl">
                <img src={thumbnail} alt="thumbnail" />
                <div className="duration m-2 w-13 h-3 absolute right-0 bottom-0 bg-[#252525] flex justify-center items-center text-xs text-white py-3 rounded-lg p-2"><p>{minAndSec}</p></div>
            </div>
            <div className="thumbnail w-full h-[140px] flex space-x-3 py-3">
                <div className="avatar w-[36px]">
                    <img src={avatar} alt="avatar" className="rounded-full w-[36px] h-[36px]" />
                </div>
                <div className="info w-[calc(100%_-_36px)] text-xs overflow-hidden text-ellipsis">
                    <div className="mb-1">
                        <p className="font-semibold text-sm h-[40px] w-full overflow-hidden text-ellipsis">{title} Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, odit. Ad, rerum corporis quos necessitatibus neque pariatur, dolor accusantium nemo odio nihil, perspiciatis fugit? Nisi ab repudiandae neque ipsam aliquid!</p>
                    </div>
                    <p>{channelName}</p>
                    <div className="flex space-x-4">
                        <p>{views} views</p>
                        <p>{`${ago.value} ${ago.unit} ago`}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default HomeVideo 