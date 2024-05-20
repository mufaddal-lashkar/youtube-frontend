import React from "react";

const Comment = ({
    content,
    avatar,
    username,
    ownerId,
    createdAt,
    likes
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
    const ago = getTimeDifference(createdAt);

    return (
        <div className="w-full h-auto flex my-4 ">
            <img className="w-[38px] h-[38px] rounded-full" src={avatar} alt="avatar" />
            <div className="w-[calc(100%_-_38px)] px-4 ">
                <span className="text-xs"><span className="mr-3 font-semibold">{username}</span><span className="text-[10px]">{`${ago.value} ${ago.unit} ago`}</span></span><br />
                <p className="text-[12px]">{content}</p>
                <div className="like">
                    <span className="text-[12px] space-x-2"><i className="fa-regular fa-thumbs-up"></i><span>{likes}</span></span>
                </div>
            </div>
        </div>
    )
}

export default Comment