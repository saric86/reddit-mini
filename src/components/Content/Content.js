/* 
import React from "react";
import Post from "./Post";

const Content = () => {

    return (
        <div className="container">
            <Post />
            <Post />
        </div>
    );
}

export default Content;
*/

import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

const Content = () => {

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
        return <p>No posts found</p>;
    }

    return (
        <div className="container">
            {posts.map((post, index) => (
                <Post key={index} title={post.title} img={post.img} />
            ))}
        </div>
    );
}

export default Content;



/* 
import React from "react";
import Post from "./Post";

const Content = () => {

    return (
        <div className="container">
            <Post />
            <Post />
        </div>
    );
}

export default Content;
*/


/*
import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

const Content = () => {

    const posts = useSelector((state) => state.reddit.posts);
    const isLoading = useSelector((state) => state.reddit.isLoading);
    const error = useSelector((state) => state.reddit.error);

    if (isLoading) {
        return <p>Loading posts...</p>;
    }

    if (error) {
        return <p>There was an error loading posts.</p>
    }

    return (
        <div className="container">
            {posts.map((post, index) => (
                <Post key={index} title={post.title} img={post.img} />
            ))}
        </div>
    );
}

export default Content;

*/