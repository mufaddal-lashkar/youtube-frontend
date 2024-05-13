import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <>
            <div className="wrapper w-[100%] h-[100vh] bg-slate-300 flex flex-col justify-center items-center">
                
                <Link  to="/login" className="bg-blue-600 text-white px-1 py-1 rounded-lg w-16 h-8 flex justify-center items-center">Login</Link>

            </div>
        </>
    )
}

export default Home