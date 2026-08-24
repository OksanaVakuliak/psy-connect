'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function LoginPrompt() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  const isPrompted = searchParams.get('auth') === 'login';

  useEffect(() => {
    if (!isPrompted) {
      return;
    }

    openAuthModal('login');
    router.replace(pathname);
  }, [isPrompted, openAuthModal, pathname, router]);

  return null;
}
