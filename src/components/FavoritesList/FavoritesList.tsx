'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { IconAlertTriangle } from '@tabler/icons-react';
import PsychologistCard from '@/components/PsychologistCard/PsychologistCard';
import SkeletonCard from '@/components/PsychologistCard/SkeletonCard';
import {
  ArrowRightIcon,
  Button,
  ButtonLink,
  EmptyState,
  HeartOutlineIcon,
  Spinner,
} from '@/components/ui';
import { useFavorites } from '@/hooks/useFavorites';
import { getErrorMessage } from '@/lib/api';
import styles from './FavoritesList.module.css';

const ERROR_ICON_SIZE = 64;
// The saved list has no page size to borrow, so the wait fills the grid's first row.
const SKELETONS = [0, 1];

export default function FavoritesList() {
  const { data, error, isPending, isFetching, refetch } = useFavorites();

  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error));
    }
  }, [error]);

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
    // A failed request leaves nothing to show, so the toast alone would leave a blank page.
    body = (
      <EmptyState
        icon={<IconAlertTriangle size={ERROR_ICON_SIZE} stroke={1.5} />}
        title="Something went wrong"
        description={getErrorMessage(error)}
        action={
          <Button size="md" disabled={isFetching} onClick={() => refetch()}>
            {isFetching ? <Spinner label="Retrying" /> : 'Try again'}
          </Button>
        }
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
