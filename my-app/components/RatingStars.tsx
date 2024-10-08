'use client';
import { Session } from 'next-auth';
import React from 'react';
import { Star } from 'lucide-react';
import { useSession } from 'next-auth/react';
import styles from '../app/HomePage/HomePage.module.css';

interface RatingStarsProps {
  mediaId: number;
  mediaType: 'movie' | 'tv';
  currentRating?: number;
  onRatingChange: (rating: number) => void;
}

interface CustomSession extends Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }


  const RatingStars: React.FC<RatingStarsProps> = ({ mediaId, mediaType, currentRating, onRatingChange }) => {
    const { data: session } = useSession() as { data: CustomSession | null };

  const handleRating = async (rating: number) => {
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

      onRatingChange(rating);
      alert('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    }
  };

  return (
    <div className={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${styles.star} ${currentRating && star <= currentRating ? styles.starFilled : ''}`}
          onClick={() => handleRating(star)}
        />
      ))}
    </div>
  );
};

export default RatingStars;