import React from "react";
import { Link } from "react-router-dom"

const SubscribedChannelAvatar = ({username,avatar,channelId}) => {

    return(
        <Link to={`/channel/${channelId}`} className="item w-14 h-full mx-2 flex flex-col justify-between items-center">
            <div className="img-container overflow-hidden flex bg-black justify-center items-center h-14 w-14 rounded-full">
                <img className="w-full" src={avatar} alt="avatar" />
            </div>
            <div className="username">
                <p className="overflow-hidden whitespace-nowrap text-ellipsis text-sm font-normal">{username}</p>
            </div>
        </Link>
    )
}

export default SubscribedChannelAvatar