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
    onMutate: ({ id, isFavorite }) => {
      if (isFavorite) {
        removeFromFavorites(id);
      } else {
        addToFavorites(id);
      }

      const previous = queryClient.getQueryData<Psychologist[]>(queryKeys.favorites.all);
      const index = previous?.findIndex((psychologist) => psychologist._id === id) ?? -1;

      if (isFavorite && previous) {
        queryClient.setQueryData(
          queryKeys.favorites.all,
          previous.filter((psychologist) => psychologist._id !== id),
        );
      }

      return { dropped: index === -1 ? undefined : previous?.[index], index };
    },
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
