import { create } from 'zustand';
import type { User } from '@/types';

export type AuthModal = 'login' | 'register';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  authModal: AuthModal | null;
  isSignInNoticeOpen: boolean;
  signInNoticeKey: number;
  setUser: (user: User) => void;
  clearUser: () => void;
  openAuthModal: (authModal: AuthModal) => void;
  closeAuthModal: () => void;
  showSignInNotice: () => void;
  hideSignInNotice: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isAuthLoading: true,
  authModal: null,
  isSignInNoticeOpen: false,
  signInNoticeKey: 0,
  setUser: (user) => set({ user, isLoggedIn: true, isAuthLoading: false }),
  clearUser: () => set({ user: null, isLoggedIn: false, isAuthLoading: false }),
  openAuthModal: (authModal) => set({ authModal, isSignInNoticeOpen: false }),
  closeAuthModal: () => set({ authModal: null }),
  showSignInNotice: () =>
    set((state) => ({ isSignInNoticeOpen: true, signInNoticeKey: state.signInNoticeKey + 1 })),
  hideSignInNotice: () => set({ isSignInNoticeOpen: false }),
}));
