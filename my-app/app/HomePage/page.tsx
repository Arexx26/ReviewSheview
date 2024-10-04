'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_CONFIG } from '@/config/api';
import styles from './HomePage.module.css';

interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
}

export default function HomePage() {
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [popularTVSeries, setPopularTVSeries] = useState<Media[]>([]);

  useEffect(() => {
    const fetchPopularMedia = async (mediaType: 'movie' | 'tv', setter: React.Dispatch<React.SetStateAction<Media[]>>) => {
      const url = `${API_CONFIG.TMDB_BASE_URL}/${mediaType}/popular?language=en-US&page=1`;
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
        setter(data.results.slice(0, 5)); // Get only the top 5
      } catch (error) {
        console.error(`Error fetching popular ${mediaType}:`, error);
      }
    };

    fetchPopularMedia('movie', setPopularMovies);
    fetchPopularMedia('tv', setPopularTVSeries);
  }, []);

  const renderMediaRow = (mediaList: Media[], type: 'movie' | 'tv') => (
    <div className={styles.mediaRow}>
      {mediaList.map((media) => (
        <Link href={`/${type}/${media.id}`} key={media.id} className={styles.mediaCard}>
          <Image
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={`${media.title || media.name} poster`}
            width={200}
            height={300}
            className={styles.poster}
          />
          <h3 className={styles.mediaTitle}>{media.title || media.name}</h3>
          <p className={styles.rating}>Rating: {media.vote_average.toFixed(1)}</p>
        </Link>
      ))}
    </div>
  );

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Popular Media</h1>
      
      <h2 className={styles.sectionTitle}>Top 5 Movies</h2>
      {renderMediaRow(popularMovies, 'movie')}
      
      <h2 className={styles.sectionTitle}>Top 5 TV Series</h2>
      {renderMediaRow(popularTVSeries, 'tv')}
    </div>
  );
}