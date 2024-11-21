import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Subreddits from './components/Subreddits/Subreddits';
import Content from './components/Content/Content';
import { useDispatch } from 'react-redux';
import { fetchAllPosts } from './store/redditSlice';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchAllPosts()); // Load all posts for global search
  }, [dispatch]);


  return (
    <div>
      <Header/>
      <div className='full-area'>
        <aside>
          <Subreddits/>
        </aside>
        <main>
          <Content/>
        </main> 
      </div>
    </div>
  );
}

export default App;