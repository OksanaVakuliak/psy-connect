'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, getSession } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/store/authStore';

export default function SessionLoader() {
  const queryClient = useQueryClient();
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
          queryClient.setQueryData(queryKeys.favorites.all, user.favorites);
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
  }, [queryClient, setUser, clearUser]);

  return null;
}
