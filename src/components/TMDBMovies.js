// components/TMDBMovies.js
import React, { useState, useEffect } from 'react';

function TMDBMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'a811f5125a024eaec27cf8e31e3e1fb6';
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
        if (!response.ok) {
          throw new Error('error fetching trending movies from tmdb');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="tmdb-container" style={{ padding: '20px', textAlign: 'center' }}>
        <h1>trending movies</h1>
        <p>loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tmdb-container" style={{ padding: '20px', textAlign: 'center' }}>
        <h1>trending movies</h1>
        <p>error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="tmdb-container" style={{ padding: '20px', textAlign: 'center' }}>
      <h1>trending movies</h1>
      {movies.length === 0 ? (
        <p>no movies found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {movies.map((movie) => (
            <li
              key={movie.id}
              style={{
                margin: '20px auto',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                maxWidth: '600px',
              }}
            >
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={{ borderRadius: '5px' }}
                />
              )}
              <p>
                <a
                  href={`https://www.themoviedb.org/movie/${movie.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: '10px', color: '#0d47a1', textDecoration: 'none', fontWeight: 'bold' }}
                >
                  view on tmdb
                </a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TMDBMovies;