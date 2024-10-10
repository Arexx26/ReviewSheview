import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface RatingStarsProps {
  initialRating?: number;
  onRate: (rating: number) => void;
  mediaId: number;
  mediaType: 'movie' | 'tv';
}

export function RatingStars({ initialRating = 0, onRate, mediaId, mediaType }: RatingStarsProps) {
  const [rating, setRating] = useState(initialRating);
  const { user } = useAuth();

  const handleRate = (newRating: number) => {
    if (!user) {
      alert('Please sign in to rate');
      return;
    }
    setRating(newRating);
    onRate(newRating);
    // Here you can add logic to submit the rating to your backend
    console.log(`Submitting rating ${newRating} for ${mediaType} ${mediaId}`);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRate(star)}
          style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}