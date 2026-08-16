import { Logo } from '@/components/ui';
import AuthControls from './AuthControls';
import Navigation from './Navigation';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Logo size="md" />
        <Navigation />
        <AuthControls />
      </div>
    </header>
  );
}
