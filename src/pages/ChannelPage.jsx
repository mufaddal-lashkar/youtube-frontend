import React, { useState, useEffect } from "react";

const ChannelPage = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [channelId, setChannelId] = useState("")

    // function to extract channel id from url
    useEffect(() => {
        const extractChannelIdFromUrl = () => {
            const currentUrl = window.location.href;
            const questionMarkIndex = currentUrl.indexOf('?');
            const queryString = currentUrl.slice(questionMarkIndex + 1);
            setChannelId(queryString)
        };
        extractChannelIdFromUrl();
    }, []);

    return(
        <>
            {channelId}
        </>
    )
}

export default ChannelPage