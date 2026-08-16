'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const AUTH_PARAM = 'auth';
const LOGIN_VALUE = 'login';

export default function AuthModalQuery() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  const shouldOpenLogin = searchParams.get(AUTH_PARAM) === LOGIN_VALUE;

  useEffect(() => {
    if (!shouldOpenLogin) {
      return;
    }

    openAuthModal(LOGIN_VALUE);

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete(AUTH_PARAM);

    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [shouldOpenLogin, searchParams, pathname, router, openAuthModal]);

  return null;
}
