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

// export const getSearchVideos = createAsyncThunk(
//     'videos/getSearchVideos',
//     async (info) => {
//         const request = await axios.get(`${server}/videos/get-search-videos?page=1&limit=20&query=${info.search}`)
//         const response = await request.data.data 
//         return response
//     }
// )
export const getSearchVideos = createAsyncThunk(
    'videos/getSearchVideos',
    async ({ search, page = 1, limit = 20 }) => {
        try {
            const response = await axios.get(`${server}/videos/get-search-videos?page=${page}&limit=${limit}&query=${search}`);
            return response.data.data;
        } catch (error) {
            throw error; // Rethrow the error to be handled by the caller
        }
    }
);

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
        .addCase(getSearchVideos.pending, (state) => {
            state.loading = true;
            state.videos = null;
            state.error = null;
        })
        .addCase(getSearchVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload;
            state.error = null;
        })
        .addCase(getSearchVideos.rejected, (state, action) => {
            state.loading = false;
            state.videos = null;
            state.error = action.error.message;
        })
    }
})

export default VideosSlice.reducer