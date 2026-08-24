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
      const index = previous?.findIndex((psychologist) => psychologist._id === id) ?? -1;

      // The favorites page is built from that cached list, so a dropped specialist has to leave it
      // now rather than after a round trip.
      if (isFavorite && previous) {
        queryClient.setQueryData(
          queryKeys.favorites.all,
          previous.filter((psychologist) => psychologist._id !== id),
        );
      }

      return { dropped: index === -1 ? undefined : previous?.[index], index };
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

      const dropped = context?.dropped;

      // Only this specialist comes back, and close to the place they held. Putting the whole list
      // back would also undo the clicks that landed while this one was travelling.
      if (dropped) {
        queryClient.setQueryData<Psychologist[]>(queryKeys.favorites.all, (current) => {
          if (!current || current.some((psychologist) => psychologist._id === id)) {
            return current;
          }

          const restored = [...current];
          restored.splice(Math.min(context.index, restored.length), 0, dropped);

          return restored;
        });
      }

      toast.error(getErrorMessage(error));
    },
  });
}
