'use client';

import Image from 'next/image';
import { IconUser } from '@tabler/icons-react';
import { useAuthStore } from '@/store/authStore';
import styles from './Header.module.css';

const AVATAR_SIZE = 32;
const FALLBACK_ICON_SIZE = 20;

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

        <span className={styles.avatar}>
          {user.avatarUrl ? (
            <Image
              className={styles.avatarImage}
              src={user.avatarUrl}
              alt=""
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
            />
          ) : (
            <IconUser size={FALLBACK_ICON_SIZE} aria-hidden="true" />
          )}
        </span>

        <button type="button" className={styles.logOut} onClick={clearUser}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className={styles.authButtons}>
      <button type="button" className={styles.logIn} onClick={() => openAuthModal('login')}>
        Log In
      </button>
      <button type="button" className={styles.signUp} onClick={() => openAuthModal('register')}>
        Sign Up
      </button>
    </div>
  );
}
