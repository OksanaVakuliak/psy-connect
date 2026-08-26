import type { Psychologist } from '@/types';
import { api } from './client';

export async function getFavorites(): Promise<Psychologist[]> {
  const { data } = await api.get<Psychologist[]>('/api/favorites');
  return data;
}

export async function addFavorite(id: string): Promise<string[]> {
  const { data } = await api.post<string[]>(`/api/favorites/${id}`);
  return data;
}

export async function removeFavorite(id: string): Promise<string[]> {
  const { data } = await api.delete<string[]>(`/api/favorites/${id}`);
  return data;
}
