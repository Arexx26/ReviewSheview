'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { API_CONFIG } from '@/config/api';
import styles from '../app/HomePage/HomePage.module.css';
import { RatingStars } from './RatingStars';
import { Home, Search, Users, Star, User } from 'lucide-react';

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

const MediaSection: React.FC<{ title: string; items: Media[]; mediaType: 'movie' | 'tv' }> = ({ title, items, mediaType }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="flex overflow-x-auto space-x-4 pb-4">
      {items.map((item) => (
        <div key={item.id} className="flex-none w-36">
          <Link href={`/${mediaType}/${item.id}`}>
            <Image
              src={`${API_CONFIG.TMDB_IMAGE_BASE_URL}${item.poster_path}`}
              alt={item.title || item.name || 'Media poster'}
              width={144}
              height={216}
              className="w-full h-52 object-cover rounded-lg shadow-lg"
            />
            <h3 className="mt-2 text-sm font-medium">{item.title || item.name}</h3>
          </Link>
          <p className="text-xs text-gray-500">Rating: {item.vote_average.toFixed(1)}</p>
        </div>
      ))}
    </div>
  </section>
);

export default function HomePageContent() {
  const { user } = useAuth();
  const [movies, setMovies] = useState<Media[]>([]);
  const [tvShows, setTvShows] = useState<Media[]>([]);

  useEffect(() => {
    fetchPopularMedia('movie').then(setMovies);
    fetchPopularMedia('tv').then(setTvShows);
  }, []);

  const handleRating = (mediaId: number, mediaType: 'movie' | 'tv', rating: number) => {
    console.log(`Submitting rating ${rating} for ${mediaType} ${mediaId}`);
    // Implement your rating submission logic here
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-indigo-600">FlickMate</span>
              </Link>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Popular Media</h1>
          <MediaSection title="Popular Movies" items={movies} mediaType="movie" />
          <MediaSection title="Popular TV Series" items={tvShows} mediaType="tv" />
        </div>
      </main>

      <nav className="bg-white shadow-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between py-4">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">
              <Home className="mx-auto h-6 w-6" />
              <span className="sr-only">Home</span>
            </Link>
            <Link href="/search" className="text-gray-600 hover:text-indigo-600">
              <Search className="mx-auto h-6 w-6" />
              <span className="sr-only">Search</span>
            </Link>
            <Link href="/groups" className="text-gray-600 hover:text-indigo-600">
              <Users className="mx-auto h-6 w-6" />
              <span className="sr-only">Groups</span>
            </Link>
            <Link href="/ratings" className="text-gray-600 hover:text-indigo-600">
              <Star className="mx-auto h-6 w-6" />
              <span className="sr-only">My Ratings</span>
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-indigo-600">
              <User className="mx-auto h-6 w-6" />
              <span className="sr-only">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}