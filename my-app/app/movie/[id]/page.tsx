'use client'; // This directive indicates that this is a client-side component

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { API_CONFIG } from '@/config/api';
import styles from '../../HomePage/HomePage.module.css';
import RatingStars from '@/components/RatingStars';

// Define the structure of our movie data
interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export default function MoviePage({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [userRating, setUserRating] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `${API_CONFIG.TMDB_BASE_URL}/movie/${params.id}?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_CONFIG.TMDB_ACCESS_TOKEN}`
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [params.id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.movieDetailsContainer}>
      <h1 className={styles.movieTitle}>{movie.title}</h1>
      <div className={styles.movieContent}>
        {movie.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className={styles.moviePoster}
          />
        )}
        <div className={styles.movieInfo}>
          <p className={styles.movieOverview}>{movie.overview}</p>
          <p className={styles.movieReleaseDate}>Release Date: {movie.release_date}</p>
          <p className={styles.movieRating}>TMDB Rating: {movie.vote_average.toFixed(1)}</p>
          <div className={styles.userRatingContainer}>
            <h3 className={styles.userRatingTitle}>Your Rating:</h3>
            <RatingStars
              mediaId={movie.id}
              mediaType="movie"
              currentRating={userRating}
              onRatingChange={setUserRating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}