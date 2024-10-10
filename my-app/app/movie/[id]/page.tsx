'use client'; // This directive indicates that this is a client-side component

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import styles from '@/app/HomePage/HomePage.module.css';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchMovieDetails(id: string): Promise<Movie> {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  return await response.json();
}

export default function MovieDetailsPage() {
  const { id } = useParams() as { id: string };
  const { user, signIn } = useAuth();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id).then(setMovie);
    }
  }, [id]);

  const handleRatingSubmit = async () => {
    if (!user) {
      alert('Please sign in to submit a rating');
      return;
    }

    try {
      // Implement your rating submission logic here
      console.log(`Submitting rating ${rating} for movie ${id}`);
      alert('Rating submitted successfully');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating');
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.movieDetailsContainer}>
      <h1 className={styles.movieTitle}>{movie.title}</h1>
      <div className={styles.movieContent}>
        <Image
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className={styles.moviePoster}
        />
        <div className={styles.movieInfo}>
          <p className={styles.movieOverview}>{movie.overview}</p>
          <p className={styles.movieReleaseDate}>Release Date: {movie.release_date}</p>
          <p className={styles.movieRating}>Average Rating: {movie.vote_average.toFixed(1)}</p>
          <div className={styles.userRatingContainer}>
            <h2 className={styles.userRatingTitle}>Rate this movie</h2>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
            <button onClick={handleRatingSubmit}>
              {user ? 'Submit Rating' : 'Sign in to Rate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}