import React, { useState } from "react";
import { NavItem } from "../components/index";

const Navbar = () => {

    const [activePage, setActivePage] = useState()

    return (
        <div className="w-[200px] text-sm h-[calc(100%_-_56px)] bottom-0 fixed flex flex-col items-center">
            <div className="mb-3">
                <NavItem to="/" text="Home" icon={<i className="fa-solid fa-house"></i>}/>
                <NavItem to="/shorts" text="Shorts" icon={<i className="fa-brands fa-youtube"></i>}/>
                <NavItem to="/subscriptions" text="Subscriptions" icon={<i className="fa-solid fa-video"></i>}/>
            </div>
            <hr className="h-[1px] w-[80%] bg-[#ccc]"/>

            <div className="my-3">
                <div className="container rounded-xl w-[180px] text-[#0f0f0f] h-10 px-3.5 space-x-5 hover:bg-[#000] hover:bg-opacity-5 bg-white flex items-center">
                    <h2 className="font-semibold text-base">You :-</h2>
                </div>
                
            </div>
        </div>
    )
}
 
export default Navbar