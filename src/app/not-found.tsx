import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui';
import styles from './statusPage.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page does not exist or has been moved',
};

export default function NotFound() {
  return (
    <section className={`container ${styles.wrapper}`}>
      <p className={styles.code}>404</p>
      <h1>Page not found</h1>
      <p className={styles.text}>The page you are looking for does not exist or has been moved.</p>
      <ButtonLink className={styles.action} href="/" size="md">
        Back to Home
      </ButtonLink>
    </section>
  );
}
