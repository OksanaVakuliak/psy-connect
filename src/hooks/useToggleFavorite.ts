'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addFavorite, getErrorMessage, removeFavorite } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { useFavoritesStore } from '@/store/favoritesStore';
import type { Psychologist } from '@/types';

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

      const previous = queryClient.getQueryData<Psychologist[]>(queryKeys.favorites.all);

      // The favorites page is built from that cached list, so a dropped specialist has to leave it
      // now rather than after a round trip. A failed request puts the list back as it was.
      if (isFavorite && previous) {
        queryClient.setQueryData(
          queryKeys.favorites.all,
          previous.filter((psychologist) => psychologist._id !== id),
        );
      }

      return { previous };
    },
    // Both endpoints answer with the whole list, so the store follows the server. The cached
    // profiles behind that list are only marked stale: refetching them right now would answer with
    // a list built before the next click and undo it on screen for as long as that answer travels.
    onSuccess: (ids) => {
      setFavorites(ids);
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all, refetchType: 'none' });
    },
    onError: (error, { id, isFavorite }, context) => {
      if (isFavorite) {
        addToFavorites(id);
      } else {
        removeFromFavorites(id);
      }

      if (context?.previous) {
        queryClient.setQueryData(queryKeys.favorites.all, context.previous);
      }

      toast.error(getErrorMessage(error));
    },
  });
}
