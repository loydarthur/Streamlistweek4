// components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './StreamList.css'; // using the same css file for styling

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">StreamList</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/tmdb">Trending Movies</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
