'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';
import { manrope } from './fonts';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import styles from './statusPage.module.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <main className={`container ${styles.wrapper}`}>
          <h1>Something went wrong</h1>
          <p className={styles.text}>
            The application failed to load. Please refresh the page or try again.
          </p>
          <Button className={styles.action} size="md" onClick={reset}>
            Try again
          </Button>
        </main>
      </body>
    </html>
  );
}
