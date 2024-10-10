'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { API_CONFIG } from '@/config/api';
import styles from '../app/HomePage/HomePage.module.css';
import { RatingStars } from './RatingStars';

interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
}

async function fetchPopularMedia(mediaType: 'movie' | 'tv'): Promise<Media[]> {
  const response = await fetch(
    `${API_CONFIG.TMDB_BASE_URL}/${mediaType}/popular?api_key=${API_CONFIG.TMDB_API_KEY}&language=en-US&page=1`
  );
  const data = await response.json();
  return data.results;
}

export default function HomePageContent() {
  const { user } = useAuth();
  const [movies, setMovies] = useState<Media[]>([]);
  const [tvShows, setTvShows] = useState<Media[]>([]);
  const movieRowRef = useRef<HTMLDivElement>(null);
  const tvShowRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPopularMedia('movie').then(setMovies);
    fetchPopularMedia('tv').then(setTvShows);
  }, []);

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleRating = (mediaId: number, mediaType: 'movie' | 'tv', rating: number) => {
    // Here you can implement the logic to submit the rating to your backend
    console.log(`Submitting rating ${rating} for ${mediaType} ${mediaId}`);
  };

  return (
    <div className={styles.container}>
      <section className={styles.mediaSection}>
        <h2>Popular Movies</h2>
        <div className={styles.mediaRowContainer}>
          <button className={`${styles.scrollButton} ${styles.leftButton}`} onClick={() => scroll('left', movieRowRef)}>
            &lt;
          </button>
          <div className={styles.mediaRow} ref={movieRowRef}>
            {movies.map((movie) => (
              <div key={movie.id} className={styles.mediaItem}>
                <Link href={`/movie/${movie.id}`}>
                  <Image
                    src={`${API_CONFIG.TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title || 'Movie poster'}
                    width={150}
                    height={225}
                    className={styles.poster}
                  />
                  <p className={styles.mediaTitle}>{movie.title}</p>
                  <div className={styles.ratingContainer}>
                    <span className={styles.star}>★</span>
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                </Link>
                {user && (
                  <RatingStars
                    mediaId={movie.id}
                    mediaType="movie"
                    onRate={(rating) => handleRating(movie.id, 'movie', rating)}
                  />
                )}
              </div>
            ))}
          </div>
          <button className={`${styles.scrollButton} ${styles.rightButton}`} onClick={() => scroll('right', movieRowRef)}>
            &gt;
          </button>
        </div>
      </section>
      <section className={styles.mediaSection}>
        <h2>Popular TV Shows</h2>
        <div className={styles.mediaRowContainer}>
          <button className={`${styles.scrollButton} ${styles.leftButton}`} onClick={() => scroll('left', tvShowRowRef)}>
            &lt;
          </button>
          <div className={styles.mediaRow} ref={tvShowRowRef}>
            {tvShows.map((show) => (
              <div key={show.id} className={styles.mediaItem}>
                <Link href={`/tv/${show.id}`}>
                  <Image
                    src={`${API_CONFIG.TMDB_IMAGE_BASE_URL}${show.poster_path}`}
                    alt={show.name || 'TV show poster'}
                    width={150}
                    height={225}
                    className={styles.poster}
                  />
                  <p className={styles.mediaTitle}>{show.name}</p>
                  <div className={styles.ratingContainer}>
                    <span className={styles.star}>★</span>
                    <span>{show.vote_average.toFixed(1)}</span>
                  </div>
                </Link>
                {user && (
                  <RatingStars
                    mediaId={show.id}
                    mediaType="tv"
                    onRate={(rating) => handleRating(show.id, 'tv', rating)}
                  />
                )}
              </div>
            ))}
          </div>
          <button className={`${styles.scrollButton} ${styles.rightButton}`} onClick={() => scroll('right', tvShowRowRef)}>
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
}