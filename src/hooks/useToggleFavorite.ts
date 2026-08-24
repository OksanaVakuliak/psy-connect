'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addFavorite, getErrorMessage, removeFavorite } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { useFavoritesStore } from '@/store/favoritesStore';

interface ToggleFavoriteVariables {
  id: string;
  isFavorite: boolean;
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const setFavorites = useFavoritesStore((state) => state.setFavorites);
  const addToFavorites = useFavoritesStore((state) => state.addFavorite);
  const removeFromFavorites = useFavoritesStore((state) => state.removeFavorite);

  return useMutation({
    mutationFn: ({ id, isFavorite }: ToggleFavoriteVariables) =>
      isFavorite ? removeFavorite(id) : addFavorite(id),
    // The heart answers the click at once instead of waiting out the request.
    onMutate: ({ id, isFavorite }) => {
      if (isFavorite) {
        removeFromFavorites(id);
      } else {
        addToFavorites(id);
      }
    },
    // Both endpoints answer with the whole list, so the store follows the server. The cached
    // profiles behind that list are only marked stale: refetching them right now would answer with
    // a list built before the next click and undo it on screen for as long as that answer travels.
    onSuccess: (ids) => {
      setFavorites(ids);
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all, refetchType: 'none' });
    },
    onError: (error, { id, isFavorite }) => {
      if (isFavorite) {
        addToFavorites(id);
      } else {
        removeFromFavorites(id);
      }

      toast.error(getErrorMessage(error));
    },
  });
}
