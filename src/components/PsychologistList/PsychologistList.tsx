'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { IconAlertTriangle, IconSearchOff } from '@tabler/icons-react';
import PsychologistCard from '@/components/PsychologistCard/PsychologistCard';
import SkeletonCard from '@/components/PsychologistCard/SkeletonCard';
import { Button, EmptyState, Spinner } from '@/components/ui';
import { PAGE_SIZE } from '@/constants/filters';
import { usePsychologistFilters } from '@/hooks/usePsychologistFilters';
import { usePsychologists } from '@/hooks/usePsychologists';
import { getErrorMessage } from '@/lib/api';
import styles from './PsychologistList.module.css';

const EMPTY_STATE_ICON_SIZE = 64;
const SKELETONS = Array.from({ length: PAGE_SIZE }, (_, index) => index);

export default function PsychologistList() {
  const { query, clearFilters } = usePsychologistFilters();
  const {
    data,
    error,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = usePsychologists(query);

  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error));
    }
  }, [error]);

  if (isPending) {
    return (
      <div className={styles.grid}>
        {SKELETONS.map((skeleton) => (
          <SkeletonCard key={skeleton} />
        ))}
      </div>
    );
  }

  const psychologists = data?.pages.flatMap((page) => page.items) ?? [];

  // A failed first request leaves nothing to show, so the toast alone would leave a blank page.
  if (error && psychologists.length === 0) {
    return (
      <EmptyState
        icon={<IconAlertTriangle size={EMPTY_STATE_ICON_SIZE} stroke={1.5} />}
        title="Something went wrong"
        description={getErrorMessage(error)}
        action={
          <Button size="md" disabled={isFetching} onClick={() => refetch()}>
            {isFetching ? <Spinner label="Retrying" /> : 'Try again'}
          </Button>
        }
      />
    );
  }

  if (psychologists.length === 0) {
    return (
      <EmptyState
        icon={<IconSearchOff size={EMPTY_STATE_ICON_SIZE} stroke={1.5} />}
        title="No specialists found"
        description="Try adjusting your filters to find the right specialist for you."
        action={
          <Button size="md" onClick={clearFilters}>
            Clear filters
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className={styles.grid}>
        {psychologists.map((psychologist) => (
          <PsychologistCard key={psychologist._id} psychologist={psychologist} />
        ))}
      </div>

      <div className={styles.pagination}>
        {hasNextPage ? (
          <Button
            variant="outlinePrimary"
            size="md"
            pill
            className={styles.loadMore}
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? (
              <Spinner label="Loading more psychologists" />
            ) : (
              'Load more psychologists'
            )}
          </Button>
        ) : (
          <p className={styles.seenAll}>You&apos;ve seen all specialists.</p>
        )}
      </div>
    </>
  );
}
