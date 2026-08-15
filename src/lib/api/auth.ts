import type { AuthResponse, LoginPayload, RegisterPayload, SessionResponse } from '@/types';
import { api } from './client';

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/api/auth/register', payload);
  return data;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/api/auth/login', payload);
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/api/auth/logout');
}

export async function getSession(): Promise<SessionResponse> {
  const { data } = await api.get<SessionResponse>('/api/auth/session');
  return data;
}
