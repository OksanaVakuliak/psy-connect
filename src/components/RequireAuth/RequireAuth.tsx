'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  useEffect(() => {
    if (isAuthLoading || isLoggedIn) {
      return;
    }

    openAuthModal('login');
    router.replace('/');
  }, [isAuthLoading, isLoggedIn, openAuthModal, router]);

  if (!isLoggedIn) {
    return null;
  }

  return children;
}
