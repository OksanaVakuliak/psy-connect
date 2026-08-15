import type { PsychologistsQuery } from '@/types';

const PSYCHOLOGISTS_ROOT = ['psychologists'] as const;
const FAVORITES_ROOT = ['favorites'] as const;
const SESSION_ROOT = ['session'] as const;
const CURRENT_USER_ROOT = ['currentUser'] as const;

export const queryKeys = {
  psychologists: {
    all: PSYCHOLOGISTS_ROOT,
    list: (query: PsychologistsQuery) => [...PSYCHOLOGISTS_ROOT, 'list', query] as const,
    detail: (id: string) => [...PSYCHOLOGISTS_ROOT, 'detail', id] as const,
  },
  favorites: {
    all: FAVORITES_ROOT,
  },
  session: {
    all: SESSION_ROOT,
  },
  currentUser: {
    all: CURRENT_USER_ROOT,
  },
} as const;
