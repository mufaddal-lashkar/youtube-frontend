import React,{useState, useEffect} from "react";
import { getSearchVideos } from "../store/VideosSlice";
import { useDispatch } from "react-redux";
import { HomeVideo } from "../components/index"


const Search = () => {

    // Initialize videos state as an empty array
    const [videos, setVideos] = useState([]); 
    const [page, setPage] = useState(1)

    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const storedQuery = localStorage.getItem('query');
        if (storedQuery) {
            setSearchTerm(storedQuery);
            console.log(searchTerm);
        }
    }, []);

    const dispatch = useDispatch()
    useEffect(() => {
        const serachVid = () => {
            console.log(searchTerm);
            const info= {
                search: searchTerm,
                page: page,
                limit: 20
            }
            
            dispatch(getSearchVideos(info))
                .then((response) => {
                    console.log(response.payload);
                    setVideos(response.payload)
                })
                .catch((error) => {
                    console.error("Error fetching videos:", error);
                });
        };
        serachVid();
        console.log(videos);
    }, [dispatch, page]);
    

    return(
        <div className="wrapper w-[100%] h-[100vh] overflow-y-scroll flex flex-col">
            <div className=" py-10 flex flex-wrap space-x-3 ">
                {/* <button onClick={getHomeVideos}>Click</button>
                <button onClick={handleLogout}>Logout</button> */}
                {
                    videos?.map((vid) => {
                        return <HomeVideo 
                                key={vid._id} 
                                thumbnail={vid.thumbnail} 
                                title={vid.title} 
                                duration={vid.duration}
                                channelName={vid.owner[0].username}
                                avatar={vid.owner[0].avatar}
                                views={vid.views}
                                uploaded={vid.createdAt}
                                />
                    })
                }
                <button onClick={() => {
                    setPage(page + 1)
                    getHomeVideos()
                    window.location.reload()
                }}>Show more</button>
            </div>
        </div>
    )
}

export default Search