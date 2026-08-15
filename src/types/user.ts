import type { Psychologist } from './psychologist';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface UserProfile extends User {
  favorites: Psychologist[];
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
}

export interface SessionResponse {
  isSessionActive: boolean;
}
