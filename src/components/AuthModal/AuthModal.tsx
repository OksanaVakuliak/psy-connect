'use client';

import { ModalOverlay } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const TITLE_ID = 'auth-modal-title';

export default function AuthModal() {
  const authModal = useAuthStore((state) => state.authModal);
  const closeAuthModal = useAuthStore((state) => state.closeAuthModal);

  if (!authModal) {
    return null;
  }

  return (
    <ModalOverlay onClose={closeAuthModal} labelledBy={TITLE_ID} contentKey={authModal}>
      {authModal === 'login' ? (
        <LoginForm titleId={TITLE_ID} />
      ) : (
        <RegisterForm titleId={TITLE_ID} />
      )}
    </ModalOverlay>
  );
}
