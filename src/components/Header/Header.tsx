import Link from 'next/link';
import LogoMark from '@/components/LogoMark/LogoMark';
import AuthControls from './AuthControls';
import Navigation from './Navigation';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <LogoMark size={24} />
          PsyConnect
        </Link>

        <Navigation />
        <AuthControls />
      </div>
    </header>
  );
}
