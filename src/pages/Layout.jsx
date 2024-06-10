import React,{useEffect, useState} from "react";
import { SideNav, Navbar } from "../components/index"
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {

    const user = localStorage.getItem('user')
    const navigate = useNavigate()
    
    const [isLogin, setIsLogin] = useState(user ? true : false)
    return (
        <>
            {isLogin?(
                <>
                    <div className="fixed top-0 h-[56px] w-[100%]">
                        <Navbar />
                    </div>
                    <SideNav />
                    <div className="w-[calc(100%_-_200px)] h-[calc(100%_-_56px)] fixed right-0 bottom-0">
                        <Outlet />
                    </div>
                </>
            ):(
                useEffect(() => {
                    navigate("/login")
                },[user])
            )}
        </>
    )
}

export default Layout