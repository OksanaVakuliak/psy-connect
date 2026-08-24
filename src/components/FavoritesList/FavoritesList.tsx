'use client';

import PsychologistCard from '@/components/PsychologistCard/PsychologistCard';
import SkeletonCard from '@/components/PsychologistCard/SkeletonCard';
import {
  ArrowRightIcon,
  ButtonLink,
  EmptyState,
  ErrorState,
  HeartOutlineIcon,
} from '@/components/ui';
import { useFavorites } from '@/hooks/useFavorites';
import { getErrorMessage } from '@/lib/api';
import styles from './FavoritesList.module.css';

// The saved list has no page size to borrow, so the wait fills the grid's first row.
const SKELETONS = [0, 1];

export default function FavoritesList() {
  // A failed list is announced by FavoritesLoader, which watches the same request from the layout.
  const { data, error, isPending, isFetching, refetch } = useFavorites();

  const psychologists = data ?? [];

  let body;

  if (isPending) {
    body = (
      <div className={styles.grid}>
        {SKELETONS.map((skeleton) => (
          <SkeletonCard key={skeleton} />
        ))}
      </div>
    );
  } else if (error && psychologists.length === 0) {
    body = (
      <ErrorState
        description={getErrorMessage(error)}
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  } else if (psychologists.length === 0) {
    body = (
      <EmptyState
        icon={<HeartOutlineIcon className={styles.emptyIcon} />}
        title="You haven't saved any specialists yet"
        description="Browse our catalog and tap the heart icon to add specialists to your favorites."
        action={
          <ButtonLink href="/psychologists" size="md">
            Browse specialists
            <ArrowRightIcon />
          </ButtonLink>
        }
      />
    );
  } else {
    body = (
      <div className={styles.grid}>
        {psychologists.map((psychologist) => (
          <PsychologistCard key={psychologist._id} psychologist={psychologist} />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* The region outlives the skeletons it speaks for, so the wait is announced. */}
      <p className="visually-hidden" role="status">
        {isPending ? 'Loading your favorites' : ''}
      </p>

      {body}
    </>
  );
}
