import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postsData } from "../components/Subreddits/postsData";
import { commentData } from "../components/Subreddits/commentData";

export const fetchComments = createAsyncThunk(
    'redditPosts/fetchComments',
    async (postId, { rejectWithValue }) => {
        try {
            const comments = commentData.postId[postId] || []; // Corrected key access
            return { postId, comments };
        } catch (error) {
            return rejectWithValue('Failed to fetch comments');
        }
    }
);

const initialState = {
    allPosts: [],
    posts: [],
    comments: {},
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

            state.filterdPosts = state.allPosts.filter(post => 
                post.title.toLowerCase().includes(searchTerm)
            );
            state.filterdPosts.forEach(post => {
                const postId = post.postId;
                if (!state.comments[postId]) {
                    state.comments[postId] = commentData.postId[postId] || [];
                }
            });
        },
        getCommentsSuccess(state, action) {
            const { postId, comments } = action.payload;
            state.comments[postId] = comments;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                const { postId, comments } = action.payload;
                state.isLoading = false;
                state.comments[postId] = comments;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch comments';
            });
    },
});

export const {
    startGetPosts,
    getPostsSuccess,
    getPostsFailed,
    setSelectedSubreddit,
    setSearchTerm,
    getAllPostsSuccess,
    getCommentsSuccess,
} = redditSlice.actions;

export default redditSlice.reducer;

export const fetchPosts = (subredditId) => async (dispatch) => {
    dispatch(startGetPosts());
    try {
        const posts = postsData.id[subredditId] || [];
        dispatch(getPostsSuccess(posts));

        // Fetch comments for all posts in the subreddit
        for (const post of posts) {
            const comments = commentData.postId[post.postId] || [];
            dispatch(getCommentsSuccess({ postId: post.postId, comments }));
        }
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
};
