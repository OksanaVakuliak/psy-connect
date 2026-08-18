import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>

      <h2>{title}</h2>

      <p className={styles.description}>{description}</p>

      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
