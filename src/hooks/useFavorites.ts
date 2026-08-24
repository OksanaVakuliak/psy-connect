'use client';

import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';

export function useFavorites(enabled = true) {
  return useQuery({
    queryKey: queryKeys.favorites.all,
    queryFn: getFavorites,
    enabled,
  });
}
