import styles from './SkeletonCard.module.css';

// Mirrors the collapsed card without the badge, so the list keeps its height
// when the real cards arrive.
export default function SkeletonCard() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.identity}>
        <span className={`${styles.block} ${styles.avatar}`} />

        <div className={styles.identityText}>
          <span className={`${styles.block} ${styles.name}`} />
          <span className={`${styles.block} ${styles.meta}`} />

          <div className={styles.row}>
            <span className={`${styles.block} ${styles.tag}`} />
            <span className={`${styles.block} ${styles.tagWide}`} />
            <span className={`${styles.block} ${styles.tag}`} />
          </div>
        </div>
      </div>

      <div className={styles.about}>
        <span className={`${styles.block} ${styles.line}`} />
        <span className={`${styles.block} ${styles.lineShort}`} />
      </div>

      <div className={`${styles.row} ${styles.conditions}`}>
        <span className={`${styles.block} ${styles.pill}`} />
        <span className={`${styles.block} ${styles.pill}`} />
        <span className={`${styles.block} ${styles.pillWide}`} />
      </div>

      <div className={styles.footer}>
        <span className={`${styles.block} ${styles.price}`} />

        <div className={styles.row}>
          <span className={`${styles.block} ${styles.button}`} />
          <span className={`${styles.block} ${styles.button}`} />
        </div>
      </div>
    </div>
  );
}
