'use client';

import React, { useState, useEffect } from 'react';
import { getMovieDetails, submitRating } from '../services/movieService';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

interface MovieDetailsProps {
  movieId: number;
}

export function MovieDetails({ movieId }: MovieDetailsProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError('Failed to fetch movie details');
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  // ... handleRatingSubmit function ...

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return null;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Vote Average: {movie.vote_average}</p>
      <p>Vote Count: {movie.vote_count}</p>
      {/* Add rating submission UI here */}
    </div>
  );
}

export default MovieDetails;