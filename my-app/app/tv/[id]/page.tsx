'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import styles from './TVPage.module.css'; // You'll need to create this CSS module
import { API_CONFIG } from '@/config/api';
interface TVData {
  id: number;
  name: string;
  poster_path: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
}

export default function TVPage() {
  const { id } = useParams();
  const [TVData, setTVData] = useState<TVData | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchTVDetails = async () => {
      // Fetch movie details from our API
      // The actual URL would be constructed using environment variables, e.g.:
      // `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movie/${id}`
     
      const url = `${API_CONFIG.TMDB_BASE_URL}/tv/${id}?api_key=${API_CONFIG.TMDB_API_KEY}`;

      console.log('Fetching TV details from:', url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Received TV data:', data);
    setTVData(data);
  } catch (error) {
    console.error('Error fetching TV details:', error);
  }
};

    if (id) {
      fetchTVDetails();
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

  if (!TVData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.TVPagePage}>
      <div className={styles.TVHeader}>
        <h1>{TVData.name}</h1>
        <p className={styles.releaseYear}>({new Date(TVData.first_air_date).getFullYear()})</p>
      </div>
      
      <div className={styles.TVContent}>
      <div className={styles.posterContainer}>
  {TVData.poster_path ? (
    <Image 
      src={`https://image.tmdb.org/t/p/w500${TVData.poster_path}`}
      alt={`${TVData.name} poster`}
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
              {TVData.vote_average !== undefined ? (
      <>
        <p>{TVData.vote_average.toFixed(1)} / 10</p>
        <p className={styles.voteCount}>({TVData.vote_count} votes)</p>
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
            <p>{TVData.overview}</p>
          </div>
          
          <div className={styles.releaseInfo}>
            <h3>Release Date</h3>
            <p>{new Date(TVData.first_air_date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}