import { create } from 'zustand';
import type { User } from '@/types';

export type AuthModal = 'login' | 'register';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  authModal: AuthModal | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setAuthLoading: (isAuthLoading: boolean) => void;
  openAuthModal: (authModal: AuthModal) => void;
  closeAuthModal: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isAuthLoading: false,
  authModal: null,
  setUser: (user) => set({ user, isLoggedIn: true, isAuthLoading: false }),
  clearUser: () => set({ user: null, isLoggedIn: false, isAuthLoading: false }),
  setAuthLoading: (isAuthLoading) => set({ isAuthLoading }),
  openAuthModal: (authModal) => set({ authModal }),
  closeAuthModal: () => set({ authModal: null }),
}));
