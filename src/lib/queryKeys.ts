import type { PsychologistsQuery } from '@/types';

export const queryKeys = {
  psychologists: {
    all: ['psychologists'] as const,
    list: (query: PsychologistsQuery) => ['psychologists', 'list', query] as const,
    detail: (id: string) => ['psychologists', 'detail', id] as const,
  },
  favorites: ['favorites'] as const,
  session: ['session'] as const,
  currentUser: ['currentUser'] as const,
};
