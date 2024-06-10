import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { RiVideoAddLine, RiVideoUploadFill } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";

const Navbar = () => {
    
    const [searchText, setSearchText] = useState("")
    const [xmark, setXmark] =  useState()
    const user = JSON.parse(localStorage.getItem('user'))
    const avatar = user.user.avatar

    useEffect(() => {
        if (searchText === "") {
            setXmark(<></>)
        } else {
            setXmark(<i className="fa-solid fa-xmark text-[#030303]"></i>)
        }
    },[searchText])
    

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value)
    }
    const handleClearSearchText = () => {
        setSearchText("")
    }

    const navigate = useNavigate()
    const handleSearch = () => {
        if (searchText === "") {
            alert("Enter keywords for search")
        } else {
            navigate(`/search/${searchText}`)
        }   
    }

    // function for create modal
    const [isCreateModal, setIsCreateModal] = useState(false)
    const handleCreateToggle = () => {
        setIsCreateModal(!isCreateModal)
    }
    const handleUploadVideoClick = () => {
        navigate("/upload-video")
        setIsCreateModal(false)
    }

    return (
        <div className="container h-full justify-between flex">
            {
                isCreateModal?(
                    <>
                        {/* <div onClick={() => setIsCreateModal(false)} className="fixed inset-0"></div> */}
                        <div className="modal w-[150px] py-3 bg-black absolute right-6 top-11 rounded-lg">
                            <div 
                                onClick={handleUploadVideoClick} 
                                className="upload-video cursor-pointer w-full px-2 flex items-center space-x-2 h-10 bg-white hover:bg-black hover:bg-opacity-10 cursor-pointer">
                                <RiVideoUploadFill />
                                <span className="text-sm font-medium">Upload video</span>
                            </div>
                        </div>
                    </>
                ):(
                    <></>
                )
            }
            <div className="flex h-full w-[185px] items-center px-6 space-x-4">
                <FaBars />
                <h1>FlickFeed</h1>
            </div>
            <div className="h-full w-[632px] flex items-center">
                <div className="flex items-center">
                    <input type="text" placeholder="Search" value={searchText} onChange={handleSearchTextChange} className="w-[514px] h-[37px] bg-[#ffffff] border-[1px] border-[#ccc] border-r-0 rounded-l-full outline-none px-5" />
                    <button onClick={handleClearSearchText} className="bg-[#ffffff] flex justify-center items-center text-xl h-[37px] w-[37px] border-[1px] border-[#ccc] border-l-0">
                        {xmark}
                    </button>
                    <button onClick={handleSearch} className="w-[64px] h-[37px] text-[#030303] bg-[#ffffff] border-[1px] border-[#ccc] border-l-0 rounded-r-full"><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            <div className="h-full flex justify-center items-center px-6 space-x-3">
                <div onClick={() => handleCreateToggle()} className="hover:bg-black cursor-pointer hover:bg-opacity-10 text-2xl rounded-full w-[34px] h-[34px] flex justify-center items-center"><RiVideoAddLine className="text-2xl"/></div>
                <img src={avatar} alt="avatar image" className=" w-[34px] rounded-full" />
            </div>
        </div>
    )
}

export default Navbar