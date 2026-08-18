import { StarOutlineIcon } from '@/components/ui';
import styles from './PsychologistCard.module.css';

const MAX_RATING = 5;
const STARS = Array.from({ length: MAX_RATING }, (_, index) => index + 1);

interface ReviewRatingProps {
  rating: number;
}

export default function ReviewRating({ rating }: ReviewRatingProps) {
  return (
    <p className={styles.reviewRating} aria-label={`Rated ${rating} out of ${MAX_RATING}`}>
      {STARS.map((star) => (
        <StarOutlineIcon
          key={star}
          className={star <= rating ? styles.reviewStar : styles.reviewStarEmpty}
        />
      ))}
    </p>
  );
}
