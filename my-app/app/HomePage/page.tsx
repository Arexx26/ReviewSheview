'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_CONFIG } from '@/config/api';
import styles from './HomePage.module.css'; // You'll need to create this CSS module

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export default function HomePage() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const url = `${API_CONFIG.TMDB_BASE_URL}/movie/popular?language=en-US&page=1`;
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
        setPopularMovies(data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Popular Movies</h1>
      <div className={styles.movieGrid}>
        {popularMovies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id} className={styles.movieCard}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
              width={200}
              height={300}
              className={styles.poster}
            />
            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <p className={styles.rating}>Rating: {movie.vote_average.toFixed(1)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}