import type { PaginatedPsychologists, Psychologist, PsychologistsQuery } from '@/types';
import { api } from './client';

export async function getPsychologists(
  query: PsychologistsQuery = {},
): Promise<PaginatedPsychologists> {
  const { data } = await api.get<PaginatedPsychologists>('/api/psychologists', { params: query });
  return data;
}

export async function getPsychologistById(id: string): Promise<Psychologist> {
  const { data } = await api.get<Psychologist>(`/api/psychologists/${id}`);
  return data;
}
