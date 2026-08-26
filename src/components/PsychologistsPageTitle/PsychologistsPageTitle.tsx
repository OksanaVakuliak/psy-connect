import styles from './PsychologistsPageTitle.module.css';

export default function PsychologistsPageTitle() {
  return (
    <header className={styles.header}>
      <h1>Find Your Psychologist</h1>

      <p className={styles.subtitle}>
        Browse our verified specialists and find the perfect match for your needs.
      </p>
    </header>
  );
}
