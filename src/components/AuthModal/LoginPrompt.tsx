'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function LoginPrompt() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  const isPrompted = searchParams.get('auth') === 'login';

  useEffect(() => {
    if (!isPrompted || isAuthLoading) {
      return;
    }

    if (!isLoggedIn) {
      openAuthModal('login');
    }

    const rest = new URLSearchParams(searchParams);
    rest.delete('auth');
    const query = rest.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [isPrompted, isAuthLoading, isLoggedIn, openAuthModal, pathname, router, searchParams]);

  return null;
}
