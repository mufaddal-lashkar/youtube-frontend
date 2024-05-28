import React from "react"
import { NavLink } from "react-router-dom"

const NavItem = ({
    text,
    icon,
    to
}) => {

    return (
        <NavLink to={to} className={({isActive}) => `container ${isActive ? "font-bold" : ""} rounded-xl w-[180px] text-[#0f0f0f] h-10 px-3.5 space-x-5 hover:bg-[#000] hover:bg-opacity-5 bg-white flex items-center`}>
            <div>
                {icon}
            </div>
            <div className="text">
                {text}
            </div>
        </NavLink>
    )
}

export default NavItem
