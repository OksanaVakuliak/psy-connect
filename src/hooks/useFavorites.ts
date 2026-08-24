'use client';

import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';

// One list serves both readers: the loader that fills the store and the page that shows the cards.
export function useFavorites(enabled = true) {
  return useQuery({
    queryKey: queryKeys.favorites.all,
    queryFn: getFavorites,
    enabled,
  });
}
