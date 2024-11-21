import React from "react";
import './Post.css';

const Post = ({ title, img }) => {
    return (
        <div className="post-content">
            <h2>{title}</h2>
            <img src={img} alt={title} />
        </div>
    );
};

export default Post;

/*

import React from "react";
import image from '../../images/doge.jpeg';
import './Post.css';

const Post = () => {

    return (
        <div className="post-content">
            <h2>This is a post</h2>
            <img src={image}/>
        </div>
    )
}

export default Post;

*/


/*

import React from "react";
import './Post.css';
import { useSelector } from "react-redux";

const Post = ({ title, img }) => {

    const filterdPosts = useSelector((state) => state.reddit.filterdPosts);

    return (
        <div className="post-content">
            {filterdPosts.length > 0 ? (
                filterdPosts.map((post, index) => (
                    <div key={index}>
                        <h2>{post.title}</h2>
                        <img src={post.img} alt={post.title} />
                    </div>
                ))
            ) : (
                <p>No posts found matching your search</p>
            )
        }
            
        </div>
    );
};

export default Post;

*/

/* 
import React from "react";
import './Post.css';

const Post = ({ title, img }) => {

    return (
        <div className="post-content">
            <h2>{title}</h2>
            <img src={img} alt={title} />
        </div>
    );
};

export default Post;

*/