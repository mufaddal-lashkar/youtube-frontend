import React, { useEffect, useState } from "react";

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

    return (
        <div className="container h-full justify-between flex">
            <div className="flex h-full w-[185px] items-center px-5 space-x-4">
                <i className="fa-solid fa-bars text-[#030303]"></i>
                <h1>TubeFlix</h1>
            </div>
            <div className="h-full w-[632px] flex items-center">
                <div className="flex items-center">
                    <input type="text" value={searchText} onChange={handleSearchTextChange} className="w-[514px] h-[37px] bg-[#ffffff] border-[1px] border-[#ccc] border-r-0 rounded-l-full outline-none px-5" />
                    <button onClick={handleClearSearchText} className="bg-[#ffffff] flex justify-center items-center text-xl h-[37px] w-[37px] border-[1px] border-[#ccc] border-l-0">
                        {xmark}
                    </button>
                    <button className="w-[64px] h-[37px] text-[#030303] bg-[#ffffff] border-[1px] border-[#ccc] border-l-0 rounded-r-full"><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            <div className="h-full w-[64px] flex justify-center items-center ">
                <img src={avatar} alt="avatar image" className="h-[34px] w-[34px] rounded-full" />
            </div>
        </div>
    )
}

export default Navbar