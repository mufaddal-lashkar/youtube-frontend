import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { server } from "../conf";
import axios from "axios";

const Comment = ({
    commentId,
    content,
    avatar,
    username,
    ownerId,
    createdAt,
}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    // fuction to get data when comment is uploaded
    function getTimeDifference(createdAt) {
        const createdAtDate = new Date(createdAt);
        const nowDate = new Date();
        const timeDiffMs = nowDate - createdAtDate;
            
        const seconds = Math.floor(timeDiffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);
            
        if (years >= 1) {
            return { value: years, unit: 'year' + (years > 1 ? 's' : '') };
        } else if (months >= 1) {
            return { value: months, unit: 'month' + (months > 1 ? 's' : '') };
        } else if (weeks >= 1) {
            return { value: weeks, unit: 'week' + (weeks > 1 ? 's' : '') };
        } else if (days >= 1) {
            return { value: days, unit: 'day' + (days > 1 ? 's' : '') };
        } else if (hours >= 1) {
            return { value: hours, unit: 'hour' + (hours > 1 ? 's' : '') };
        } else if (minutes >= 1) {
            return { value: minutes, unit: 'minute' + (minutes > 1 ? 's' : '') };
        } else {
            return { value: seconds, unit: 'second' + (seconds > 1 ? 's' : '') };
        }
    }
    const ago = getTimeDifference(createdAt);

    // function to delete btn
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const [commentEditModal, setCommentEditModal] = useState(false)
    const [commentTextValue, setCommentTextValue] = useState("")
    const [submitDisabled, setSubmitDisabled] = useState(true)
    useEffect(() => {
        setCommentTextValue(content)
        if (user?.user._id == ownerId) {
            setShowDeleteBtn(true)
        }
    },[])
    const handleCommentDelete = async () => {
        console.log("id", commentId);
        const apiUrl = `${server}/comments/c/${commentId}`
        const data = {
            userId: user?.user._id
        }
        await axios.post(apiUrl, data)
        .then((res) => {
            console.log(res.data.message);
            window.location.reload()
        })
        .catch((err) => {
            console.log(err);
        })
    }
    const openCommentEditModal = () => {
        setCommentEditModal(true);
    }
    useEffect(() => {
        if(commentTextValue !== "") {
            setSubmitDisabled(false)
        } else {
            setSubmitDisabled(true)
        }
    }, [commentTextValue])

    // function to update comment
    const updateComment = async () => {
        const apiUrl = `${server}/comments/c/${commentId}`
        const data = {
            userId: user?.user._id,
            content: commentTextValue
        }
        await axios.patch(apiUrl, data)
        .then((res) => {
            console.log(res.data);
            setCommentEditModal(false)
            window.location.reload()
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // function to get comments likes
    const [commentLikes, setCommentLikes] = useState(0)
    const [isCommentLiked, setIsCommentLiked] = useState()
    useEffect(() => {
        getCommentsLikes()
        isCommentLikedByCurrentUser()
    },[commentId])
    const getCommentsLikes = async () => {
        const apiUrl = `${server}/likes/comment-likes/c/${commentId}`
        await axios.get(apiUrl)
        .then((res) => {
            setCommentLikes(res.data.data);
        })
        .catch((err) => {
            // console.log(err);
        })
    }
    const handleCommentLike = async () => {
        const apiUrl = `${server}/likes/toggle/c/${commentId}`
        const data = {
            userId: user?.user._id
        }
        await axios.post(apiUrl, data)
        .then((res) => {
            setIsCommentLiked(res.data.data);
            getCommentsLikes()
        })
        .catch((err) => {
            // console.log(err);
        })
    }
    const isCommentLikedByCurrentUser = async () => {
        const apiUrl = `${server}/likes/isCommentLikedByCurrentUser/c/${commentId}`
        const data = {
            userId: user?.user._id
        }
        await axios.post(apiUrl, data)
        .then((res) => {
            setIsCommentLiked(res.data.data);
        })
        .catch((err) => {
            // console.log(err);
        })
    }

    return (
        <div className="w-full h-auto flex my-4 ">
            {commentEditModal?(
                <div onClick={() => {
                    setCommentTextValue(content)
                    setCommentEditModal(false)
                    }} className="inset-0 w-vw h-vh bg-black bg-opacity-20 fixed flex justify-center items-center">
                    <div onClick={(e) => e.stopPropagation()} className="container space-y-2 w-[600px] h-[230px] bg-white rounded-xl p-3 relative">
                        <button onClick={() => {
                            setCommentTextValue(content)
                            setCommentEditModal(false)
                            }} className="close absolute text-2xl font-bold top-3 right-3"><IoClose /></button>
                        <p className="text-lg font-medium">Update comment</p>
                        <textarea rows={5} onChange={(e) => setCommentTextValue(e.target.value)} className="w-full resize-none p-1 bg-black bg-opacity-5 outline-none rounded-lg" value={commentTextValue}></textarea>
                        <button onClick={() => updateComment()} className="justify-self-end w-[93px] h-[36px] rounded-full text-white font-medium bg-[#065fd4] disabled:bg-black disabled:bg-opacity-10 disabled:font-normal disabled:text-black" disabled={submitDisabled} >Comment</button>
                    </div>
                </div>
            ):(
                <></>
            )
            }
            <img className="w-[38px] h-[38px] rounded-full" src={avatar} alt="avatar" />
            <div className="w-[calc(100%_-_38px)] px-4 ">
                <span className="text-xs"><span className="mr-3 font-semibold">{username}</span><span className="text-[10px]">{`${ago.value} ${ago.unit} ago`}</span></span><br />
                <p className="text-[12px]">{content}</p>
                <div className="like flex justify-between mt-1">
                    <button onClick={() => handleCommentLike()} className="text-[12px] space-x-2 flex justify-center items-center">{isCommentLiked? <BiSolidLike className="text-base"/> : <BiLike className="text-base"/>}<span>{commentLikes}</span></button>
                    {showDeleteBtn? (
                        <div className="flex space-x-2">
                            <button onClick={() => handleCommentDelete()} className="text-[12px] bg-black bg-opacity-5 hover:bg-opacity-10 rounded-full h-7 w-7 flex justify-center items-center"><RiDeleteBin6Line className="text-base"/></button>
                            <button onClick={() => openCommentEditModal()} className="text-[12px] bg-black bg-opacity-5 hover:bg-opacity-10 rounded-full h-7 w-7 flex justify-center items-center"><MdEdit className="text-base"/></button>
                        </div>
                        ): (<></>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Comment