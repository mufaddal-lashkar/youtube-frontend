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

export const getSearchVideos = createAsyncThunk(
    'videos/getSearchVideos',
    async ({ search, page = 1, limit = 20 }) => {
        try {
            const request = await axios.get(`${server}/videos/get-search-videos?page=${page}&limit=${limit}&query=${search}`);
            const response = await  response.data.data;
        } catch (error) {
            throw error;
        }
    }
);

export const getVideoById = createAsyncThunk(
    'videos/getVideoById',
    async (videoId) => {
        try {
            const request = await axios.get(`${server}/videos/v/:${videoId}`)
            const response = await request.data.data
        } catch (error) {
            throw error
        }
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
        .addCase(getVideoById.pending, (state) => {
            state.loading = true;
            state.videos = null;
            state.error = null;
        })
        .addCase(getVideoById.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload;
            state.error = null;
        })
        .addCase(getVideoById.rejected, (state, action) => {
            state.loading = false;
            state.videos = null;
            state.error = action.error.message;
        })
    }
})

export default VideosSlice.reducer