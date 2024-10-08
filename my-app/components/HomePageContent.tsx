'use client';
import { Session } from 'next-auth';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_CONFIG } from '@/config/api';
import styles from '../app/HomePage/HomePage.module.css';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useSession } from 'next-auth/react';
import RatingStars from './RatingStars';

interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
}

interface CustomSession extends Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
export default function HomePageContent() {
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [popularTVSeries, setPopularTVSeries] = useState<Media[]>([]);
  const movieRowRef = useRef<HTMLDivElement>(null);
  const tvRowRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession() as { data: CustomSession | null };

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
        setter(data.results.slice(0, 10)); // Get first 10 results
      } catch (error) {
        console.error(`Error fetching popular ${mediaType}:`, error);
      }
    };

    fetchPopularMedia('movie', setPopularMovies);
    fetchPopularMedia('tv', setPopularTVSeries);
  }, []);

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const scrollAmount = 200;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleRating = async (mediaId: number, mediaType: 'movie' | 'tv', rating: number) => {
    if (!session || !session.user) {
      alert('Please log in to rate media');
      return;
    }

    try {
      const response = await fetch('/api/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mediaId,
          mediaType,
          rating,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }

      alert('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    }
  };

  const renderMediaRow = (mediaList: Media[], type: 'movie' | 'tv', ref: React.RefObject<HTMLDivElement>) => (
    <div className={styles.mediaRowContainer}>
      <button
        onClick={() => scroll('left', ref)}
        className={`${styles.scrollButton} ${styles.leftButton}`}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <div ref={ref} className={styles.mediaRow}>
        {mediaList.map((media) => (
          <div key={media.id} className={styles.mediaItem}>
            <Link href={`/${type}/${media.id}`}>
              {media.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
                  alt={media.title || media.name || 'Media poster'}
                  width={100}
                  height={150}
                  className={styles.poster}
                />
              ) : (
                <div className={styles.placeholderPoster}>No Image</div>
              )}
              <p className={styles.mediaTitle}>{media.title || media.name}</p>
            </Link>
            <RatingStars
              mediaId={media.id}
              mediaType={type}
              onRatingChange={() => {}}
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll('right', ref)}
        className={`${styles.scrollButton} ${styles.rightButton}`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Popular Movies</h2>
      {renderMediaRow(popularMovies, 'movie', movieRowRef)}
      
      <h2 className={styles.sectionTitle}>Popular TV Series</h2>
      {renderMediaRow(popularTVSeries, 'tv', tvRowRef)}
    </div>
  );
}