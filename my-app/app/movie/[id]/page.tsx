'use client'; // This directive indicates that this is a client-side component

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import styles from './MoviePage.module.css'; // Importing CSS styles for this component

// Define the structure of our movie data
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
    // Extract the 'id' parameter from the URL
    const { id } = useParams();
    
    // State to store the movie data and user's rating
    const [movieData, setMovieData] = useState<MovieData | null>(null);
    const [userRating, setUserRating] = useState<number | null>(null);
  
    // Effect hook to fetch movie details when the component mounts or 'id' changes
    useEffect(() => {
      const fetchMovieDetails = async () => {
        // Fetch movie details from our API
        // The actual URL would be constructed using environment variables, e.g.:
        // `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movie/${id}`
        const response = await fetch(`/api/movie/${id}`);
        const data = await response.json();
        setMovieData(data);
      };
  
      if (id) {
        fetchMovieDetails();
      }
    }, [id]);

  // Function to handle user rating submission
  const handleRatingSubmit = async (rating: number) => {
    // TODO: Implement rating submission logic
    // The API endpoint would typically be defined in an environment variable:
    // await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/rate-movie/${id}`, {
    //   method: 'POST',
    //   body: JSON.stringify({ rating }),
    // });
    setUserRating(rating);
  };

  // Show loading state if movie data hasn't been fetched yet
  if (!movieData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Render the movie details
  return (
    <div className={styles.moviePage}>
      {/* Movie title and release year */}
      <div className={styles.movieHeader}>
        <h1>{movieData.title}</h1>
        <p className={styles.releaseYear}>({new Date(movieData.release_date).getFullYear()})</p>
      </div>
      
      <div className={styles.movieContent}>
        {/* Movie poster */}
        <div className={styles.posterContainer}>
          {movieData.poster_path ? (
            <Image 
              // The base URL for images would typically come from an environment variable:
              // src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${movieData.poster_path}`}
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
          {/* Average rating display */}
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
            
            {/* User rating input */}
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
          
          {/* Movie overview */}
          <div className={styles.overview}>
            <h3>Overview</h3>
            <p>{movieData.overview}</p>
          </div>
          
          {/* Release date information */}
          <div className={styles.releaseInfo}>
            <h3>Release Date</h3>
            <p>{new Date(movieData.release_date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}