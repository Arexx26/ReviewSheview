'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { RatingStars } from '@/components/RatingStars';
import styles from '@/app/HomePage/HomePage.module.css';

interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchTVShowDetails(id: string): Promise<TVShow> {
  const response = await fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`
  );
  return await response.json();
}

export default function TVShowDetailsPage() {
  const { id } = useParams() as { id: string };
  const { user } = useAuth();
  const [tvShow, setTVShow] = useState<TVShow | null>(null);

  useEffect(() => {
    if (id) {
      fetchTVShowDetails(id).then(setTVShow);
    }
  }, [id]);

  const handleRating = async (rating: number) => {
    if (!user) {
      alert('Please sign in to submit a rating');
      return;
    }

    try {
      // Implement your rating submission logic here
      console.log(`Submitting rating ${rating} for TV show ${id}`);
      alert('Rating submitted successfully');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating');
    }
  };

  if (!tvShow) return <div>Loading...</div>;

  return (
    <div className={styles.movieDetailsContainer}>
      <h1 className={styles.movieTitle}>{tvShow.name}</h1>
      <div className={styles.movieContent}>
        <Image
          src={`${IMAGE_BASE_URL}${tvShow.poster_path}`}
          alt={tvShow.name}
          width={300}
          height={450}
          className={styles.moviePoster}
        />
        <div className={styles.movieInfo}>
          <p className={styles.movieOverview}>{tvShow.overview}</p>
          <p className={styles.movieReleaseDate}>First Air Date: {tvShow.first_air_date}</p>
          <p className={styles.movieRating}>Average Rating: {tvShow.vote_average.toFixed(1)}</p>
          <div className={styles.userRatingContainer}>
            <h2 className={styles.userRatingTitle}>Rate this TV show</h2>
            <RatingStars 
              onRate={handleRating} 
              mediaId={tvShow.id} 
              mediaType="tv"
            />
          </div>
        </div>
      </div>
    </div>
  );
}