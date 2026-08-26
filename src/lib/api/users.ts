import type { UserProfile } from '@/types';
import { api } from './client';

export async function getCurrentUser(): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>('/api/users/current');
  return data;
}
