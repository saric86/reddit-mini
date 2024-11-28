import React, { useState } from "react";
import logo from '../../images/reddit-logo-icon.png';
import searchIcon from '../../images/search-icon.png';
import menuIcon from '../../images/menu-icon.png'; // Add a menu icon
import './Header.css';
import { setSearchTerm } from "../../store/redditSlice";
import { useDispatch } from "react-redux";
import Subreddits from "../Subreddits/Subreddits"; // Import Subreddits

const Header = ({ onSelectSubreddit }) => {
    const [searchTerm, setSearch] = useState('');
    const [menuOpen, setMenuOpen] = useState(false); // Track menu state
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        dispatch(setSearchTerm(value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle menu state
    };

    const closeMenu = () => {
        setMenuOpen(false); // Close menu
    };

    const handleSubredditSelect = (subredditId) => {
        onSelectSubreddit(subredditId); // Notify App of subreddit selection
        closeMenu(); // Close the menu
    };

    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Reddit Logo" />
                <p>Reddit<span>Mini</span></p>
            </div>
            <form className="search" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Search"
                    onChange={handleChange}
                    value={searchTerm}
                />
                <button>
                    <img src={searchIcon} alt="Search" />
                </button>
            </form>
            <div className="menu">
                <button onClick={toggleMenu}>
                    <img src={menuIcon} alt="Menu" />
                </button>
            </div>
            {menuOpen && (
                <div className="menu-content">
                    <Subreddits onSelectSubreddit={handleSubredditSelect} />
                </div>
            )}
        </header>
    );
};

export default Header;


/*
import React, { useState } from "react";
import logo from '../../images/reddit-logo-icon.png';
import searchIcon from '../../images/search-icon.png';
import './Header.css';
import { setSearchTerm } from "../../store/redditSlice";
import { useDispatch } from "react-redux";

const Header = () => {
    const [searchTerm, setSearch] = useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        dispatch(setSearchTerm(value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <header>
            <div className="logo">
                <img src={logo}/>
                <p>Reddit<span>Mini</span></p>
            </div>
            <form className="search" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Search"
                    onChange={handleChange}
                    value={searchTerm}
                />
                <button>
                    <img src={searchIcon}/>
                </button>
            </form>
            <div className="empty">
            </div>
        </header>
    );
};

export default Header;
*/