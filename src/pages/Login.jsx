import React, { useState } from "react";
import { InputField } from "../components/index"
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

    // manage state for email and password
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // redux state
    const {loading, error} = useSelector((state) => state.user)

    // functions to update values of email and password
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // configure dispatch and navigate
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // function to handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        let userCredential= {
            email: email,
            password: password
        }
        dispatch(loginUser(userCredential))
            .then((result) => {
                if(result.payload) {
                    setEmail("")
                    setPassword("")
                    navigate("/")
                }
            })
        
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
                    required= {true}
                />
                <InputField 
                    type= "password"
                    placeholder= "Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    required= {true}
                />
                <button 
                    type="submit"
                    className="bg-blue-600 text-white py-1.5 px-6 rounded-lg"
                >
                    {loading?'Loading...': 'Login'}
                </button>
                {error&&(
                    <div className="alert alert-danger" role="alert">{error}</div>
                )}
            </form>
        </div>
    )
}

export default Login