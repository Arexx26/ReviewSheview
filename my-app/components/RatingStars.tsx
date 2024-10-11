import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import styles from '../app/HomePage/HomePage.module.css';

interface RatingStarsProps {
  initialRating?: number;
  onRate: (rating: number) => void;
  mediaId: number;
  mediaType: 'movie' | 'tv';
}

export function RatingStars({ initialRating = 0, onRate, mediaId, mediaType }: RatingStarsProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const { user } = useAuth();

  const handleRate = (newRating: number) => {
    if (!user) {
      alert('Please sign in to rate');
      return;
    }
    setRating(newRating);
    onRate(newRating);
  };

  return (
    <div className={styles.ratingStars}>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={index}
            className={`${styles.star} ${ratingValue <= (hover || rating) ? styles.starFilled : ''}`}
            onClick={() => handleRate(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}