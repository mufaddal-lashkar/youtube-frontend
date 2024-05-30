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
        <Link to={`/video/${videoId}`} className="container px-1 py-1 w-full my-4 sm:w-[320px] h-auto text-[10px] hover:bg-black hover:bg-opacity-10 rounded-xl flex flex-col justify-center items-center">
            <div className="thumbnail w-[95%] h-[172px] sm:h-[180px] relative overflow-hidden rounded-xl">
                <img src={thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
                <div className="duration m-2 absolute right-0 bottom-0 bg-[#252525] flex justify-center items-center text-xs text-white py-1 px-2 rounded-lg">
                <p>{minAndSec}</p>
                </div>
            </div>
            <div className="details w-full h-auto sm:h-[100px] flex space-x-3 py-3">
                <div className="avatar w-[36px] flex-shrink-0">
                <img src={avatar} alt="avatar" className="rounded-full w-[36px] h-[36px] object-cover" />
                </div>
                <div className="info flex-grow text-xs overflow-hidden">
                <div className="mb-1">
                    <p className="font-semibold text-sm max-h-[40px] line-clamp-2">{title} Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam, expedita vitae animi eaque, inventore assumenda sint ullam reprehenderit recusandae officiis. Earum qui expedita nulla eos itaque dolorum officia quia!</p>
                </div>
                <p>{channelName}</p>
                <div className="flex space-x-4 text-gray-500">
                    <p>{views} views</p>
                    <p>{`${ago.value} ${ago.unit} ago`}</p>
                </div>
                </div>
            </div>
        </Link>
    )
}

export default HomeVideo 