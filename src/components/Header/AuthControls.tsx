'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar, Button } from '@/components/ui';
import { logout } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import styles from './Header.module.css';

export default function AuthControls() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const clearUser = useAuthStore((state) => state.clearUser);
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  const { mutate: logOut, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearUser();
      queryClient.clear();
      router.push('/');
    },
  });

  if (isLoggedIn && user) {
    return (
      <div className={styles.user}>
        <p className={styles.welcome}>Welcome, {user.name}</p>

        <Avatar src={user.avatarUrl} />

        <button
          type="button"
          className={styles.logOut}
          onClick={() => logOut()}
          disabled={isLoggingOut}
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div
      className={[styles.authButtons, isAuthLoading && styles.pending].filter(Boolean).join(' ')}
    >
      <Button variant="outline" onClick={() => openAuthModal('login')}>
        Log In
      </Button>
      <Button onClick={() => openAuthModal('register')}>Sign Up</Button>
    </div>
  );
}
