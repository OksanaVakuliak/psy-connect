'use client';

import { useEffect } from 'react';
import { IconLock, IconX } from '@tabler/icons-react';
import { Button } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
import styles from './SignInNotice.module.css';

const AUTO_CLOSE_DELAY = 4000;
const LOCK_ICON_SIZE = 16;
const CLOSE_ICON_SIZE = 12;

export default function SignInNotice() {
  const isOpen = useAuthStore((state) => state.isSignInNoticeOpen);
  const hideSignInNotice = useAuthStore((state) => state.hideSignInNotice);
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeoutId = setTimeout(hideSignInNotice, AUTO_CLOSE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [isOpen, hideSignInNotice]);

  if (!isOpen) {
    return null;
  }

  return (
    <aside className={styles.notice} role="status">
      <span className={styles.badge}>
        <IconLock size={LOCK_ICON_SIZE} aria-hidden="true" />
      </span>

      <div className={styles.content}>
        <div className={styles.head}>
          <p className={styles.title}>Sign in required</p>

          <button
            type="button"
            className={styles.close}
            onClick={hideSignInNotice}
            aria-label="Close"
          >
            <IconX size={CLOSE_ICON_SIZE} />
          </button>
        </div>

        <p className={styles.text}>
          Please log in or create an account to save specialists to your favorites.
        </p>

        <Button variant="outline" className={styles.action} onClick={() => openAuthModal('login')}>
          Log In
        </Button>
      </div>
    </aside>
  );
}
