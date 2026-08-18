import styles from './FilterBar.module.css';

// Keeps the filter bar's footprint while FilterBar waits for the URL search params on the client.
export default function FilterBarFallback() {
  return (
    <div className={styles.bar} aria-hidden="true">
      <span className={styles.placeholder} />
    </div>
  );
}
