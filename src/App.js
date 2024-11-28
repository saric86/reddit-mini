import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Subreddits from './components/Subreddits/Subreddits';
import Content from './components/Content/Content';
import { useDispatch } from 'react-redux';
import { fetchAllPosts } from './store/redditSlice';

function App() {
    const dispatch = useDispatch();
    const [selectedSubreddit, setSelectedSubreddit] = useState(null);

    useEffect(() => {
        dispatch(fetchAllPosts()); // Load all posts for global search
    }, [dispatch]);

    const handleSubredditSelect = (subredditId) => {
        setSelectedSubreddit(subredditId); // Update selected subreddit
    };

    return (
        <div>
            <Header onSelectSubreddit={handleSubredditSelect} />
            <div className='full-area'>
                <aside>
                    <Subreddits onSelectSubreddit={handleSubredditSelect} />
                </aside>
                <main>
                    <Content subredditID={selectedSubreddit} />
                </main>
            </div>
        </div>
    );
}

export default App;