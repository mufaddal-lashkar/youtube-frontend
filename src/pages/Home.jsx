import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    const getUser = () => {
        let user = localStorage.getItem('user')
        if(user) {
            user = JSON.parse(user);
        } else {
            user = null;
        }
        return user;
    }

    const handleLogout = () => {
        console.log("here");
        localStorage.removeItem('user')
        window.location.reload();
    }

    const [user, setUser] = useState(getUser())

    return (
        <>
            <div className="wrapper w-[100%] h-[100vh] bg-slate-300 flex flex-col justify-center items-center">
                {user?(
                    <>
                        <h1>Welcome back {user.user.fullName}</h1>
                        <button className="bg-blue-600 text-white px-1 py-1 rounded-lg w-16 h-8 flex justify-center items-center" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link  to="/login" className="bg-blue-600 text-white px-1 py-1 rounded-lg w-16 h-8 flex justify-center items-center">Login</Link>
                )}
            </div>
        </>
    )
}

export default Home