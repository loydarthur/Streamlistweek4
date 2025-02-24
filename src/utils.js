// src/utils.js

// normalize title: trim and lowercase a string
export const normalizeTitle = (title) => title.trim().toLowerCase();

// search tmdb for a query and return the results
export const searchMovieOnTMDB = async (query, apiKey) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('error fetching movie from tmdb');
  }
  const data = await response.json();
  return data.results;
};

// validate a movie title by checking tmdb for an exact or partial match
export const validateMovie = async (titleToValidate) => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const results = await searchMovieOnTMDB(titleToValidate, API_KEY);
  let matchingMovie;
  if (results && results.length > 0) {
    // exact match using normalized title
    matchingMovie = results.find(
      (movie) =>
        movie.title &&
        normalizeTitle(movie.title) === normalizeTitle(titleToValidate)
    );
    // if no exact match, try a partial match
    if (!matchingMovie) {
      const partialMatches = results.filter(
        (movie) =>
          movie.title &&
          normalizeTitle(movie.title).includes(normalizeTitle(titleToValidate))
      );
      if (partialMatches.length > 0) {
        matchingMovie = partialMatches[0];
      }
    }
  }
  return matchingMovie;
};