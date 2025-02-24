// components/About.js
import React from 'react';
import './StreamList.css'; // use the same styles for a consistent look

function About() {
  return (
    <div className="streamlist-container">
      <h1>About StreamList</h1>
      <p>
        StreamList is a progressive web application built with React that helps you manage your personal movie and TV show lists. 
        It leverages modern web technologies to deliver a fast and reliable experience even when you're offline.
      </p>
      <p>
        The app uses local storage to save your movie data and integrates with the TMDB API to validate and fetch movie details.
        This means you can quickly add your favorite films, and StreamList will verify the details for you.
      </p>
      <p>
        Whether you're planning a movie night or keeping track of your favorite shows, StreamList is designed to be simple, efficient, and always at your fingertips.
      </p>
      <p>
        Enjoy using StreamList and happy viewing!
      </p>
    </div>
  );
}

export default About;