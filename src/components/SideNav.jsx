import React from "react";
import { NavItem } from "../components/index";

const Navbar = () => {

    return (
        <div className="w-[244px] h-[calc(100%_-_56px)] bottom-0 bg-slate-600 text-white fixed">
            <NavItem to="/" text="Home" icon={<i className="fa-solid fa-house"></i>}/>
            <NavItem to="/profile" text="Profile" icon={<i className="fa-solid fa-house"></i>}/>
        </div>
    )
}

export default Navbar