import React, { useState } from "react";
import { InputField } from "../components/index"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setEmail("")
        setPassword("")
    }

    return (
        <div className="wrapper flex items-center justify-center w-full h-[100vh]">
            <form 
                method="post" 
                onSubmit={handleSubmit}
                className="flex flex-col w-1/3 items-center space-y-2"
            >
                <InputField 
                    type= "email"
                    placeholder= "Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    required= "true"
                />
                <InputField 
                    type= "password"
                    placeholder= "Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    required= "true"
                />
                <button 
                    type="submit"
                    className="bg-blue-600 text-white py-1.5 px-6 rounded-lg"
                > Login </button>
            </form>
        </div>
    )
}

export default Login