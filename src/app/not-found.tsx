import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './statusPage.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className={`container ${styles.wrapper}`}>
      <p className={styles.code}>404</p>
      <h1>Page not found</h1>
      <p className={styles.text}>The page you are looking for does not exist or has been moved.</p>
      <Link className={styles.button} href="/">
        Back to Home
      </Link>
    </section>
  );
}
