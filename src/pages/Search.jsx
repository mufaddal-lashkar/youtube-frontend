import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { HomeVideo } from "../components/index"
import { server } from "../conf";
import axios from "axios";


const Search = () => {

    const { searchText } = useParams()
    const [videos, setVideos] = useState([])

    useEffect(() => {
        getSearchVideos()
    },[searchText])
    const getSearchVideos = async () => {
        const apiUrl = `${server}/videos/get-search-videos`
        const data = {
            input: searchText
        }
        await axios.post(apiUrl, data)
        .then((res) => {
            setVideos(res.data.data);
        })
        .catch((err) => {
            // console.log(err);
        })
    }

    

    return(
        <div className="wrapper w-[100%] h-[100vh] overflow-y-scroll flex flex-col">
            <div className=" py-10 flex flex-wrap space-x-3 ">
                {
                    videos?.map((vid) => {
                        return <HomeVideo 
                                key={vid._id} 
                                thumbnail={vid.thumbnail} 
                                title={vid.title} 
                                duration={vid.duration}
                                channelName={vid.owner.username}
                                avatar={vid.owner.avatar}
                                views={vid.views}
                                uploaded={vid.createdAt}
                                videoId={vid._id}
                                />
                    })
                }
            </div>
        </div>
    )
}

export default Search