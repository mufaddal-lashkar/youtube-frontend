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
            <div className="wrapper w-[100%] grid-cols-3 grid-rows-3 gap-10 h-[100vh] bg-slate-300 flex flex-col justify-center items-center">
                <div >5</div>
                <div >6</div>
                <div >7</div>
                <div >8</div>
                <div >9</div>
                <div >10</div>
                <div >11</div>
                <div >12</div>
                <div >13</div>
            </div>
        </>
    )
}

export default Home