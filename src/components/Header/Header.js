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