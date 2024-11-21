/*
import { createSlice } from "@reduxjs/toolkit";
import { postsData } from "../components/Subreddits/postsData";

const initialState = {
    posts: [],
    error: false,
    isLoading: false,
    selectedSubreddit: null,
};

const redditSlice = createSlice({
    name: 'redditPosts',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        startGetPosts(state) {
            state.isLoading = true;
            state.error = false;
        },
        getPostsSuccess(state, action) {
            state.isLoading = false;
            state.posts = action.payload;
        },
        getPostsFailed(state) {
            state.isLoading = false;
            state.error = true;
        },
        setSelectedSubreddit(state, action) {
            state.selectedSubreddit = action.payload;
        }
    }
});

export const {
    setPosts,
    startGetPosts,
    getPostsSuccess,
    getPostsFailed,
    setSelectedSubreddit,
} = redditSlice.actions;

export default redditSlice.reducer;

export const fetchPosts = (subreddit) => async (dispatch) => {
    try {
        dispatch(startGetPosts());
        const posts = await npnting(subreddit);
        dispatch(getPostsSuccess(posts));
    } catch (error) {
        dispatch(getPostsFailed());
    }
};

const selectPosts = (state) => state.reddit.posts;
export const selectSelectedSubreddit = (state) =>
  state.reddit.selectedSubreddit;

*/

import { createSlice } from "@reduxjs/toolkit";
import { postsData } from "../components/Subreddits/postsData";

const initialState = {
    allPosts: [],
    posts: [],
    error: false,
    isLoading: false,
    selectedSubreddit: null,
    search: "",
    filterdPosts: [],
};

const redditSlice = createSlice({
    name: 'redditPosts',
    initialState,
    reducers: {
        startGetPosts(state) {
            state.isLoading = true;
            state.error = false;
        },
        getPostsSuccess(state, action) {
            state.isLoading = false;
            state.posts = action.payload;
            state.filterdPosts = action.payload;
        },
        getAllPostsSuccess(state, action) {
            state.allPosts = action.payload;
        },
        getPostsFailed(state) {
            state.isLoading = false;
            state.error = true;
        },
        setSelectedSubreddit(state, action) {
            state.selectedSubreddit = action.payload;
        },
        setSearchTerm(state, action) {
            state.search = action.payload;
            const searchTerm = action.payload.toLowerCase();

            state.filterdPosts = state.allPosts.filter(post => post.title.toLowerCase().includes(searchTerm));
        }
    },
});

export const {
    startGetPosts,
    getPostsSuccess,
    getPostsFailed,
    setSelectedSubreddit,
    setSearchTerm,
    getAllPostsSuccess,
} = redditSlice.actions;

export default redditSlice.reducer;

export const fetchPosts = (subredditId) => (dispatch) => {
    dispatch(startGetPosts());
    try {
        const posts = postsData.id[subredditId] || [];
        dispatch(getPostsSuccess(posts));
    } catch (error) {
        dispatch(getPostsFailed());
    }
};

export const fetchAllPosts = () => (dispatch) => {
    try {
        const allPosts = Object.values(postsData.id).flat();
        dispatch(getAllPostsSuccess(allPosts));
    } catch (error) {
        console.error('Failed to fetch all posts', error);
    }
}
