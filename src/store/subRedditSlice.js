/*
import { createSlice } from "@reduxjs/toolkit";
import { redditsData } from "../components/Subreddits/redditsData";

const initialState = {
    subreddits: [],
    error: false,
    isLoading: false,
};

const subRedditSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {
        startGetSubreddits(state) {
            state.isLoading = true;
            state.error = false;
        },
        getSubredditsSuccess(state, action) {
            state.isLoading = false;
            state.subreddits = action.payload;
        },
        getSubredditsFailed(state) {
            state.isLoading = false;
            state.error = true;
        },
    },
});

export const {startGetSubreddits, getSubredditsSuccess, getSubredditsFailed,} = subRedditSlice.actions;

export default subRedditSlice.reducer;

export const fetchSubreddits = () => (dispatch) => {
    try {
        dispatch(startGetSubreddits());
        dispatch(getSubredditsSuccess(redditsData));
    } catch (error) {
        dispatch(getSubredditsFailed());
    }
};

export const selectSubreddits = (state) => state.subreddits.subreddits;

*/

import { createSlice } from "@reduxjs/toolkit";
import { redditsData } from "../components/Subreddits/redditsData";

const initialState = {
    subreddits: [],
    error: false,
    isLoading: false,
    selectedSubreddit: null,
};

const subRedditSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {
        startGetSubreddits(state) {
            state.isLoading = true;
            state.error = false;
        },
        getSubredditsSuccess(state, action) {
            state.isLoading = false;
            state.subreddits = action.payload;
        },
        getSubredditsFailed(state) {
            state.isLoading = false;
            state.error = true;
        },
        setSelectedSubreddit(state, action) {
            state.selectedSubreddit = action.payload;
        },
    },
});

export const {
    startGetSubreddits,
    getSubredditsSuccess,
    getSubredditsFailed,
    setSelectedSubreddit,
} = subRedditSlice.actions;

export default subRedditSlice.reducer;

export const fetchSubreddits = () => (dispatch) => {
    try {
        dispatch(startGetSubreddits());
        dispatch(getSubredditsSuccess(redditsData));
    } catch (error) {
        dispatch(getSubredditsFailed());
    }
};

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const selectSelectedSubreddit = (state) => state.subreddits.selectedSubreddit;
