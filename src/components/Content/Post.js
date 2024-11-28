import React, { useState, useEffect } from "react";
import './Post.css';
import comment from '../../images/comment.png';
import arrowUp from '../../images/arrow-up.png';
import arrowDown from '../../images/arrow-down.png';
import { useSelector } from "react-redux";

const Post = ({ postId, title, img, subredditID, count }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [localCount, setLocalCount] = useState(count);
    const [hasIncremented, setHasIncremented] = useState(false);
    const [hasDecremented, setHasDecremented] = useState(false);

    const comments = useSelector((state) => state.reddit.comments[postId] || []);
    const isLoading = useSelector((state) => state.reddit.isLoading);

    useEffect(() => {
        setIsVisible(false);
        setHasDecremented(false);
        setHasIncremented(false);
        setLocalCount(count);
    }, [subredditID, count]);

    const toggleVisible = () => {
        if (!isVisible) {
            console.log(`Fetching comments for postId: ${postId}`);
        }
        setIsVisible(!isVisible);
    };

    const increment = () => {
        if(!hasIncremented && hasDecremented) {
            setLocalCount(localCount +2);
            setHasIncremented(true);
            setHasDecremented(false);
        } else if (!hasIncremented) {
            setLocalCount(localCount +1);
            setHasIncremented(true);
            setHasDecremented(false);
        } else if (hasIncremented) {
            setLocalCount(localCount -1);
            setHasIncremented(false);
        }
    }

    const decrement = () => {
        if(!hasDecremented && hasIncremented) {
            setLocalCount(localCount -2);
            setHasDecremented(true);
            setHasIncremented(false);
        } else if(!hasDecremented) {
            setLocalCount(localCount -1);
            setHasDecremented(true);
            setHasIncremented(false);
        } else if (hasDecremented) {
            setLocalCount(localCount+1);
            setHasDecremented(false);
        }
    }

    return (
        <div className="post-content">
            <h2>{title}</h2>
            <img className="img1" src={img} alt={title} />
            <div className="counts-comments">
                <div className="counter">
                    <img className="arrow-up" src={arrowUp} onClick={increment} style={{ opacity: hasIncremented ? 0.5 : 1, cursor: "pointer" }}/>
                    <h5>{localCount}</h5>
                    <img className="arrow-down" src={arrowDown} onClick={decrement} style={{ opacity: hasDecremented ? 0.5 : 1, cursor: "pointer" }}/>
                </div>
                <div className="comment-section" onClick={toggleVisible}>
                    <img className="img2" src={comment} alt="comments icon" />
                    <h5>{comments.length}</h5>
                </div>
            </div>
            {isVisible && (
                    <div className="new-row">
                        {isLoading ? (
                            <p>Loading comments...</p>
                        ) : comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <img
                                        className="comment-profile"
                                        src={comment.profile}
                                        alt={comment.name}
                                    />
                                    <div className="comment-detail">
                                        <div className="comment-name">
                                            <h6>{comment.name}</h6>
                                            <small>• {comment.date}</small>
                                        </div>
                                        <p>{comment.comment}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No comments available!</p>
                        )}
                    </div>
                )}
        </div>
    );
};

export default Post;