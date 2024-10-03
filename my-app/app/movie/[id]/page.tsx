'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import styles from './MoviePage.module.css'; // You'll need to create this CSS module

interface MovieData {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export default function MoviePage() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`/api/movie/${id}`);
      const data = await response.json();
      setMovieData(data);
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const handleRatingSubmit = async (rating: number) => {
    // Implement your rating submission logic here
    // For example:
    // await fetch(`/api/rate-movie/${id}`, {
    //   method: 'POST',
    //   body: JSON.stringify({ rating }),
    // });
    setUserRating(rating);
  };

  if (!movieData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.moviePage}>
      <div className={styles.movieHeader}>
        <h1>{movieData.title}</h1>
        <p className={styles.releaseYear}>({new Date(movieData.release_date).getFullYear()})</p>
      </div>
      
      <div className={styles.movieContent}>
      <div className={styles.posterContainer}>
  {movieData.poster_path ? (
    <Image 
      src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
      alt={`${movieData.title} poster`}
      width={300}
      height={450}
      className={styles.poster}
    />
  ) : (
    <div className={styles.noPoster}>No poster available</div>
  )}
</div>
        
        <div className={styles.movieDetails}>
          <div className={styles.ratings}>
            <div className={styles.averageRating}>
              <h3>Average Rating</h3>
              {movieData.vote_average !== undefined ? (
      <>
        <p>{movieData.vote_average.toFixed(1)} / 10</p>
        <p className={styles.voteCount}>({movieData.vote_count} votes)</p>
      </>
    ) : (
      <p>No ratings yet</p>
    )}
    </div>
            
            <div className={styles.userRating}>
              <h3>Your Rating</h3>
              {userRating ? (
                <p>{userRating} / 10</p>
              ) : (
                <div className={styles.ratingButtons}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                    <button 
                      key={rating} 
                      onClick={() => handleRatingSubmit(rating)}
                      className={styles.ratingButton}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.overview}>
            <h3>Overview</h3>
            <p>{movieData.overview}</p>
          </div>
          
          <div className={styles.releaseInfo}>
            <h3>Release Date</h3>
            <p>{new Date(movieData.release_date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}