import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import videoReducer from "./VideosSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        videos: videoReducer,
    }
})

export default store