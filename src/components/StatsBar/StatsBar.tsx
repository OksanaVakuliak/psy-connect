import styles from './StatsBar.module.css';

const STATS = [
  { label: 'Verified specialists', value: '120+' },
  { label: 'Happy clients', value: '5,000+' },
  { label: 'Years of experience', value: '10+' },
];

export default function StatsBar() {
  return (
    <section className="container">
      <dl className={styles.list}>
        {STATS.map(({ label, value }) => (
          <div key={label} className={styles.item}>
            <dt className={styles.label}>{label}</dt>
            <dd className={styles.value}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
