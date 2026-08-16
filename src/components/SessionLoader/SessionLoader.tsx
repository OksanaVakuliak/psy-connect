'use client';

import { useEffect } from 'react';
import { getCurrentUser, getSession } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function SessionLoader() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    let isActive = true;

    const restoreSession = async () => {
      try {
        const { isSessionActive } = await getSession();

        if (!isSessionActive) {
          throw new Error('Session is not active');
        }

        const user = await getCurrentUser();

        if (isActive) {
          setUser(user);
        }
      } catch {
        if (isActive) {
          clearUser();
        }
      }
    };

    restoreSession();

    return () => {
      isActive = false;
    };
  }, [setUser, clearUser]);

  return null;
}
