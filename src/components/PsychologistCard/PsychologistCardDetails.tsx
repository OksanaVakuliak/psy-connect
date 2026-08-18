import { Tag } from '@/components/ui';
import type { Review } from '@/types';
import ReviewRating from './ReviewRating';
import styles from './PsychologistCard.module.css';

// "Anna M." becomes "A.M.", the form the mockup uses inside the reviewer avatar.
function toInitials(reviewer: string): string {
  const letters = reviewer
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase());

  return letters.length > 0 ? `${letters.join('.')}.` : '';
}

interface PsychologistCardDetailsProps {
  approaches: string[];
  reviews: Review[];
}

export default function PsychologistCardDetails({
  approaches,
  reviews,
}: PsychologistCardDetailsProps) {
  return (
    <div className={styles.details}>
      {approaches.length > 0 && (
        <section className={styles.section}>
          <h4 className={styles.approachesLabel}>Therapeutic Approaches</h4>

          <ul className={styles.tagList}>
            {approaches.map((approach) => (
              <Tag key={approach} variant="soft">
                {approach}
              </Tag>
            ))}
          </ul>
        </section>
      )}

      {reviews.length > 0 && (
        <section className={styles.section}>
          <h4 className={styles.reviewsLabel}>Client Reviews</h4>

          <ul className={styles.reviews}>
            {reviews.map((review) => (
              <li className={styles.review} key={`${review.reviewer}-${review.comment}`}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewAvatar} aria-hidden="true">
                    {toInitials(review.reviewer)}
                  </span>

                  <div>
                    <p className={styles.reviewer}>{review.reviewer}</p>

                    <ReviewRating rating={review.rating} />
                  </div>
                </div>

                <q className={styles.reviewComment}>{review.comment}</q>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
