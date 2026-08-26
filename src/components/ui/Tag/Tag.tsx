import type { ReactNode } from 'react';
import styles from './Tag.module.css';

type TagVariant = 'solid' | 'outline' | 'soft';

interface TagProps {
  variant?: TagVariant;
  children: ReactNode;
}

export function Tag({ variant = 'solid', children }: TagProps) {
  return <li className={`${styles.tag} ${styles[variant]}`}>{children}</li>;
}
