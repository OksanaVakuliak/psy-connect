'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesStore } from '@/store/favoritesStore';

export default function FavoritesLoader() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setFavorites = useFavoritesStore((state) => state.setFavorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  // A restored session seeds this query from the profile it already fetched, so a reload asks for
  // nothing extra. Logging in later finds an empty cache and loads the list here.
  const { data } = useQuery({
    queryKey: queryKeys.favorites.all,
    queryFn: getFavorites,
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (!isLoggedIn) {
      clearFavorites();
      return;
    }

    if (data) {
      setFavorites(data.map((psychologist) => psychologist._id));
    }
  }, [isLoggedIn, data, setFavorites, clearFavorites]);

  return null;
}
