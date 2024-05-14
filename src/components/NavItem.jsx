import React from "react"
import { Link } from "react-router-dom"

const NavItem = ({
    text,
    icon,
    to
}) => {

    return (
        <Link to={to} className="container w-[80%] h-10 bg-slate-400 flex">
            <div>
                {icon}
            </div>
            <div className="text">
                {text}
            </div>
        </Link>
    )
}

export default NavItem