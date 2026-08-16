'use client';

import { Avatar, Button } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
import styles from './Header.module.css';

export default function AuthControls() {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const clearUser = useAuthStore((state) => state.clearUser);
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  if (isAuthLoading) {
    return <div className={styles.placeholder} aria-hidden="true" />;
  }

  if (isLoggedIn && user) {
    return (
      <div className={styles.user}>
        <p className={styles.welcome}>Welcome, {user.name}</p>

        <Avatar src={user.avatarUrl} />

        <button type="button" className={styles.logOut} onClick={clearUser}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className={styles.authButtons}>
      <Button variant="outline" onClick={() => openAuthModal('login')}>
        Log In
      </Button>
      <Button onClick={() => openAuthModal('register')}>Sign Up</Button>
    </div>
  );
}
