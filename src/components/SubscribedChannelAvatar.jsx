import React from "react";
import { Link } from "react-router-dom"

const SubscribedChannelAvatar = ({username,avatar,channelId}) => {

    return(
        <Link to={`/channel/${channelId}`} className="item w-14 h-full mx-2 flex flex-col justify-between">
            <div className="img-container overflow-hidden h-14 w-14 rounded-full">
                <img src={avatar} alt="avatar" />
            </div>
            <div className="username">
                <p className="overflow-hidden whitespace-nowrap text-ellipsis text-xs">{username}</p>
            </div>
        </Link>
    )
}

export default SubscribedChannelAvatar