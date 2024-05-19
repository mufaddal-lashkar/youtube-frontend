import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideoById } from "../store/VideosSlice";
import axios from "axios";
import { server } from "../conf";

const Video = () => {

    // const [videoId, setVideoId] = useState('6630fb327cd924aa0fc3ab3f')
    // const [video, SetVideo] = useState()
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     const extractVideoIdFromUrl = () => {
    //       const currentUrl = window.location.href;
    //       const urlParams = new URLSearchParams(currentUrl);
    //       const id = urlParams.get('videoId');
    //       setVideoId(id);
    //       console.log(videoId);
    //     };
    //     extractVideoIdFromUrl();
    // }, []);
    // const params= {
    //     videoId: videoId
    // }
    // dispatch(getVideoById({params}))
    //             .then((response) => {
    //                 console.log(response);
    //                 SetVideo(response.payload)
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching videos:", error);
    //             });

const [videoId, setVideoId] = useState();
const [video, setVideo] = useState();

  useEffect(() => {
    const extractVideoIdFromUrl = () => {
      const currentUrl = window.location.href;
      const questionMarkIndex = currentUrl.indexOf('?');
      const queryString = currentUrl.slice(questionMarkIndex + 1);
      setVideoId(queryString)
    };
    extractVideoIdFromUrl();
  }, []);
  
  useEffect(() => {
    if(videoId) {
      getVideoById(videoId)
    }
  },[videoId])

  const getVideoById = async (videoId) => {
    try {
      const apiUrl = `${server}/videos/v/${videoId}`
      const response = await axios.get(apiUrl)
      console.log(response.data.data);
      setVideo(response.data.data)
    } catch (error) {
        console.error("Error fetching video:", error);
    }
  }
    return (
        <>
            
        </>
    )
}

export default Video