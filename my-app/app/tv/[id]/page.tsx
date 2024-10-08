'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { API_CONFIG } from '@/config/api';
import styles from '../../HomePage/HomePage.module.css';
import RatingStars from '@/components/RatingStars';

interface TVSeriesDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
}

export default function TVSeriesPage({ params }: { params: { id: string } }) {
  const [tvSeries, setTVSeries] = useState<TVSeriesDetails | null>(null);
  const [userRating, setUserRating] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchTVSeriesDetails = async () => {
      const url = `${API_CONFIG.TMDB_BASE_URL}/tv/${params.id}?language=en-US`;
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
        setTVSeries(data);
      } catch (error) {
        console.error('Error fetching TV series details:', error);
      }
    };

    fetchTVSeriesDetails();
  }, [params.id]);

  if (!tvSeries) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.movieDetailsContainer}>
      <h1 className={styles.movieTitle}>{tvSeries.name}</h1>
      <div className={styles.movieContent}>
        {tvSeries.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`}
            alt={tvSeries.name}
            width={300}
            height={450}
            className={styles.moviePoster}
          />
        )}
        <div className={styles.movieInfo}>
          <p className={styles.movieOverview}>{tvSeries.overview}</p>
          <p className={styles.movieReleaseDate}>First Air Date: {tvSeries.first_air_date}</p>
          <p className={styles.movieRating}>TMDB Rating: {tvSeries.vote_average.toFixed(1)}</p>
          <div className={styles.userRatingContainer}>
            <h3 className={styles.userRatingTitle}>Your Rating:</h3>
            <RatingStars
              mediaId={tvSeries.id}
              mediaType="tv"
              currentRating={userRating}
              onRatingChange={setUserRating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}