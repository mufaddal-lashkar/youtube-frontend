import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UploadVideo = () => {

    const [thumnailPrev, setThumbnailPrev] = useState()
    const [video, setVideo] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPrev(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [submitDisabled, setSubmitDisabled] = useState(false)
    useEffect(() => {
        if(thumnailPrev && video && title && description) {
            setSubmitDisabled(false)
        } else {
            setSubmitDisabled(true)
        }
    }, [thumnailPrev, video, title, description])
    


    return (
        <div className="container w-full h-[100vh] p-4 overflow-y-scroll">
            <div className="upper flex">
                <div className="left w-[70%]">
                    <div className="thumbnail-prev w-[680px] h-[380px] bg-white rounded-xl overflow-hidden">
                        {thumnailPrev?(
                            <img className="w-full" src={thumnailPrev} alt="Thumbnail preview" />
                        ):(
                            <div className="prev bg-black bg-opacity-10 h-full w-full flex justify-center items-center">
                                <h1 className="text-black font-medium text-2xl">Thumbnail preview</h1>
                            </div>
                        )}
                    </div>
                </div>
                <div className="right w-[30%] space-y-4">
                        <div className="get-video w-full bg-black bg-opacity-5 space-y-2 hover:bg-opacity-10 p-4 rounded-xl">
                            <h1 className="text-[#262626] font-medium text-xl">Upload video</h1>
                            <input required type="file" accept="video/*" onChange={(e) => setVideo(e.target.value)} />
                        </div>
                        <div className="get-thumbnail w-full bg-black bg-opacity-5 space-y-2 hover:bg-opacity-10 p-4 rounded-xl">
                            <h1 className="text-[#262626] font-medium text-xl">Upload thumbnail</h1>
                            <input required type="file" accept="image/*" onChange={(event) => handleFileChange(event) }/>
                        </div>
                        <div className=" flex w-full space-x-3 items-center">
                            <button onClick={""} className="w-[173px] h-[46px] rounded-full text-white font-medium bg-[#065fd4] disabled:bg-black disabled:bg-opacity-10 disabled:font-medium disabled:text-black" disabled={submitDisabled} >Upload video</button>
                            <Link to="/" className="w-[93px] h-[36px] flex justify-center items-center rounded-full text-text font-medium bg-black bg-opacity-5 hover:bg-opacity-10">Cancel</Link>
                        </div>
                </div>
            </div>
            <div className="lower w-full h-auto">
                <div className="get-thumbnail w-full mt-8 bg-black bg-opacity-5 space-y-2 hover:bg-opacity-10 p-4 rounded-xl">
                    <h1 className="text-[#262626] font-medium text-xl">Title</h1>
                    <input required className="w-full rounded-lg outline-none leading-8 px-2" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="get-thumbnail w-full mt-8 bg-black bg-opacity-5 space-y-2 hover:bg-opacity-10 p-4 rounded-xl">
                    <h1 className="text-[#262626] font-medium text-xl">Description</h1>
                    <textarea required cols={7} rows={5} className="w-full px-2 rounded-lg outline-none" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
            </div>
        </div>
    )
}

export default UploadVideo