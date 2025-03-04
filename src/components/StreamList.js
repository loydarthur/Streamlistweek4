// components/StreamList.js
import React, { useState, useEffect } from 'react';
import { FaFilm, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import { validateMovie } from '../utils';
import './StreamList.css';

// this component manages the movie list and stores changes in local storage
function StreamList() {
  const [input, setInput] = useState('');
  const [movies, setMovies] = useState(() => {
    const stored = localStorage.getItem('movies');
    return stored ? JSON.parse(stored) : [];
  });
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [notification, setNotification] = useState('');

  // save movies to local storage when movies change
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  // handle add movie form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = input.trim();
    if (!title) return;
    try {
      const match = await validateMovie(title);
      if (!match) {
        setNotification("movie not validated by tmdb. adding movie anyway.");
        setMovies([
          ...movies,
          { id: Date.now(), name: title, verified: false, tmdbData: null },
        ]);
      } else {
        setMovies([
          ...movies,
          { id: Date.now(), name: match.title, verified: true, tmdbData: match },
        ]);
      }
      setInput('');
    } catch (error) {
      setNotification("error validating movie. please try again later.");
    } finally {
      setTimeout(() => setNotification(''), 3000);
    }
  };

  // handle edit form submission and revalidate the edited movie title
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const newTitle = editText.trim();
    if (!newTitle) return;
    try {
      const match = await validateMovie(newTitle);
      setMovies(
        movies.map((movie) =>
          movie.id === editId
            ? {
                ...movie,
                name: match ? match.title : newTitle,
                verified: Boolean(match),
                tmdbData: match || null,
              }
            : movie
        )
      );
      setEditId(null);
      setEditText('');
    } catch (error) {
      setNotification("error validating movie on edit. please try again later.");
    } finally {
      setTimeout(() => setNotification(''), 3000);
    }
  };

  // handle delete movie
  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  // toggle complete status for a movie
  const handleComplete = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, completed: !movie.completed } : movie
      )
    );
  };

  // start editing a movie
  const handleEdit = (id, name) => {
    setEditId(id);
    setEditText(name);
  };

  return (
    <div className="streamlist-container">
      <h1>streamlist - your movie/tv show list</h1>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="add a movie/show..."
        />
        <button type="submit">
          <FaFilm /> add
        </button>
      </form>

      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className={movie.completed ? 'completed' : ''}>
            {editId === movie.id ? (
              <form onSubmit={handleEditSubmit} className="edit-form">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button type="submit">
                  <FaCheck />
                </button>
              </form>
            ) : (
              <>
                <span>
                  {movie.name}{' '}
                  {movie.verified && (
                    <>
                      <span className="verified-badge">verified</span>
                      {movie.tmdbData && (
                        <a
                          href={`https://www.themoviedb.org/movie/${movie.tmdbData.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tmdb-link"
                        >
                          view on tmdb
                        </a>
                      )}
                    </>
                  )}
                </span>
                <div className="actions">
                  <button onClick={() => handleComplete(movie.id)}>
                    <FaCheck />
                  </button>
                  <button onClick={() => handleEdit(movie.id, movie.name)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(movie.id)}>
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {notification && (
        <div className="notification-message">{notification}</div>
      )}
    </div>
  );
}

export default StreamList;
