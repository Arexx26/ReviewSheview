'use client';
import { API_CONFIG } from '@/config/api';
//import React from 'react';

const API_KEY = API_CONFIG.TMDB_API_KEY;
const BASE_URL = API_CONFIG.TMDB_BASE_URL;

export async function getMovieDetails(movieId: number) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
}

export async function submitRating(movieId: number, rating: number) {
  // Implement your app's rating submission logic here
  // This could involve sending a POST request to your backend API
  const response = await fetch('/api/submit-rating', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movieId, rating }),
  });
  if (!response.ok) {
    throw new Error('Failed to submit rating');
  }
  return response.json();
}

export async function searchMedia(query: string) {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search media');
    }
    return response.json();
  }