'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HomePage.module.css';

interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchPopularMedia(mediaType: 'movie' | 'tv'): Promise<Media[]> {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await response.json();
  return data.results;
}

export default function HomePage() {
  const { user, loading, signIn, signOut } = useAuth();
  const [movies, setMovies] = useState<Media[]>([]);
  const [tvShows, setTvShows] = useState<Media[]>([]);
  const movieRowRef = useRef<HTMLDivElement>(null);
  const tvShowRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPopularMedia('movie').then(setMovies);
    fetchPopularMedia('tv').then(setTvShows);
  }, []);

  const handleSignIn = async () => {
    try {
      await signIn();
      console.log('Sign in successful');
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('Sign out successful');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to FlickMate</h1>
      <div className={styles.authSection}>
        {user ? (
          <>
            <p>Welcome, {user.displayName || user.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
            <Link href="/profile">Profile</Link>
            <Link href="/groups">Groups</Link>
          </>
        ) : (
          <button onClick={handleSignIn}>Sign In with Google</button>
        )}
      </div>
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
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title || 'Movie poster'}
                    width={150}
                    height={225}
                    className={styles.poster}
                  />
                  <p className={styles.mediaTitle}>{movie.title}</p>
                </Link>
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
                    src={`${IMAGE_BASE_URL}${show.poster_path}`}
                    alt={show.name || 'TV show poster'}
                    width={150}
                    height={225}
                    className={styles.poster}
                  />
                  <p className={styles.mediaTitle}>{show.name}</p>
                </Link>
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