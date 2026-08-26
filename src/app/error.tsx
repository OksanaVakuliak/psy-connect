'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';
import styles from './statusPage.module.css';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className={`container ${styles.wrapper}`}>
      <h1>Something went wrong</h1>
      <p className={styles.text}>We could not load this page. Please try again in a moment.</p>
      <Button className={styles.action} size="md" onClick={reset}>
        Try again
      </Button>
    </section>
  );
}
