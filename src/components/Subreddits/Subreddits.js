import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubreddits } from '../../store/subRedditSlice';
import './Subreddits.css';

function Subreddits({ onSelectSubreddit }) {
    const dispatch = useDispatch();
    const subreddits = useSelector((state) => state.subreddit.subreddits);
    const isLoading = useSelector((state) => state.subreddit.isLoading);
    const error = useSelector((state) => state.subreddit.error);

    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

    const handleSubredditClick = (id) => {
        onSelectSubreddit(id); // Notify App.js of selected subreddit
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>There was an error loading the subreddits.</p>;
    }

    return (
        <div className="aside-left">
            <h1>Subreddits</h1>
            <ul>
                {subreddits.map((reddit, index) => (
                    <li key={index}>
                        <button type="button" onClick={() => handleSubredditClick(reddit.id)}>
                            <img src={reddit.image} alt={reddit.name} />
                            <h3>{reddit.name}</h3>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Subreddits;