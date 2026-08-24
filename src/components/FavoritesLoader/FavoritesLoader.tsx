'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getErrorMessage, getFavorites } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesStore } from '@/store/favoritesStore';

export default function FavoritesLoader() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setFavorites = useFavoritesStore((state) => state.setFavorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  // A restored session seeds this query from the profile it already fetched, so a reload asks for
  // nothing extra. Logging in later finds an empty cache and loads the list here.
  const { data, error } = useQuery({
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

  // Nothing on screen belongs to this component, so a failed list would leave every heart empty
  // with no sign that the answer never came.
  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error));
    }
  }, [error]);

  return null;
}
