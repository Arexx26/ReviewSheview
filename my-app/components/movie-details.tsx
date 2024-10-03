import { useState, useEffect } from 'react';
import { getMovieDetails, submitRating } from '../services/movieService';

export function MovieDetails({ movieId }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleRatingSubmit = async () => {
    try {
      await submitRating(movieId, userRating);
      alert('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return null;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>TMDB Rating: {movie.vote_average} ({movie.vote_count} votes)</p>
      <div>
        <h3>Rate this movie:</h3>
        <input 
          type="number" 
          min="1" 
          max="10" 
          value={userRating} 
          onChange={(e) => setUserRating(Number(e.target.value))}
        />
        <button onClick={handleRatingSubmit}>Submit Rating</button>
      </div>
      {/* Add more movie details as needed */}
    </div>
  );
}