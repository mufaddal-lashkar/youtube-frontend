import React, { useState } from "react";
import { NavItem } from "../components/index";
import { GoHome, GoHomeFill, GoHistory  } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdSubscriptions  } from "react-icons/md";
import { BsPersonVideo3 } from "react-icons/bs";
import { CgPlayList } from "react-icons/cg";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";

const Navbar = () => {

    const logoProp = "text-base"
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    const [activePage, setActivePage] = useState()

    return (
        <div className="w-[200px] text-sm h-[calc(100%_-_56px)] bottom-0 fixed flex flex-col items-center">
            <div className="mb-3">
                <NavItem to="/" text="Home" icon={<GoHome className={logoProp}/>}/>
                <NavItem to="/shorts" text="Shorts" icon={<SiYoutubeshorts className={logoProp}/>}/>
                <NavItem to="/subscriptions" text="Subscriptions" icon={<MdOutlineSubscriptions className={logoProp}/>}/>
            </div>
            <hr className="h-[1px] w-[80%] bg-[#ccc]"/>

            <div className="my-3">
                <div className="container rounded-xl w-[180px] text-[#0f0f0f] h-10 px-3.5 space-x-5 hover:bg-[#000] hover:bg-opacity-5 bg-white flex items-center">
                    <h2 className="font-semibold text-sm">You :-</h2>
                </div>
                <div className="">
                <NavItem to={`/Yourchannel/${user?.user._id}`} text="Your channel" icon={<BsPersonVideo3 className={logoProp}/>}/>
                <NavItem to="/history" text="History" icon={<GoHistory className={logoProp}/>}/>
                <NavItem to="/playlists" text="Playlists" icon={<CgPlayList className={logoProp}/>}/>
                <NavItem to="/your-videos" text="Your videos" icon={<AiOutlinePlaySquare className={logoProp}/>}/>
                <NavItem to="/watch-later" text="Watch later" icon={<FaRegClock className={logoProp}/>}/>
                <NavItem to="/liked-videos" text="Liked videos" icon={<BiLike className={logoProp}/>}/>
                </div>
            </div>
            <hr className="h-[1px] w-[80%] bg-[#ccc]"/>

            <div className="my-3">
                <div className="container rounded-xl w-[180px] text-[#0f0f0f] h-10 px-3.5 space-x-5 hover:bg-[#000] hover:bg-opacity-5 bg-white flex items-center">
                    <h2 className="font-semibold text-sm">Subscription</h2>
                </div>
                <div>
                    
                </div>
            </div>

        </div>
    )
}
 
export default Navbar