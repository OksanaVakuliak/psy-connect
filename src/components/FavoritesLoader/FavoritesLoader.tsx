'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useFavorites } from '@/hooks/useFavorites';
import { getErrorMessage } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesStore } from '@/store/favoritesStore';

export default function FavoritesLoader() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setFavorites = useFavoritesStore((state) => state.setFavorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  const { data, error } = useFavorites(isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      clearFavorites();
      return;
    }

    if (data) {
      setFavorites(data.map((psychologist) => psychologist._id));
    }
  }, [isLoggedIn, data, setFavorites, clearFavorites]);

  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error));
    }
  }, [error]);

  return null;
}
