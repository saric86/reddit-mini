import { configureStore } from "@reduxjs/toolkit";
import redditReducer from './redditSlice';
import subRedditReducer from './subRedditSlice';

export const Store = configureStore({
    reducer: {
        reddit: redditReducer,
        subreddit: subRedditReducer,
    },
});