import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import './Content.css';
import { fetchPosts } from "../../store/redditSlice";

const Content = ({subredditID}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (subredditID) {
            dispatch(fetchPosts(subredditID));
        }
    }, [dispatch, subredditID]);

    const posts = useSelector((state) => state.reddit.filterdPosts);
    const isLoading = useSelector((state) => state.reddit.isLoading);
    const error = useSelector((state) => state.reddit.error);

    if (isLoading) {
        return <p>Loading posts...</p>;
    }

    if (error) {
        return <p>There was an error loading posts.</p>
    }

    if (posts.length === 0) {
        return <p>No posts found. Please select a subreddit in the menu.</p>;
    }

    return (
        <div className="container">
            {posts.map((post, index) => (
                <Post 
                    key={index} 
                    postId={post.postId} 
                    title={post.title} 
                    img={post.img} 
                    subredditID={subredditID} 
                    count={post.count}                    
                />
            ))}
        </div>
    );
}

export default Content;