import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {server} from "../conf"
import { info } from "autoprefixer";

export const getVideos = createAsyncThunk(
    'videos/getVideos',
    async (page) => {
        // localStorage.removeItem('videos')
        const request = await axios.get(`${server}/videos/get-all-videos?page=${page}&limit=20`)
        // console.log(request);
        const response = await request.data.data
        // console.log(response);
        // localStorage.setItem('videos', JSON.stringify(response))
        return response
    }
)

const VideosSlice = createSlice({
    name: "videos",
    initialState: {
        loading: false,
        videos: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(getVideos.pending, (state) => {
            state.loading = true;
            state.videos = null;
            state.error = null;
        })
        .addCase(getVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload;
            state.error = null;
        })
        .addCase(getVideos.rejected, (state, action) => {
            state.loading = false;
            state.videos = null;
            state.error = action.error.message;
        })
    }
})

export default VideosSlice.reducer