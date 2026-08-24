import { create } from 'zustand';

interface FavoritesState {
  ids: string[];
  setFavorites: (ids: string[]) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  ids: [],
  setFavorites: (ids) => set({ ids }),
  addFavorite: (id) =>
    set((state) => (state.ids.includes(id) ? state : { ids: [...state.ids, id] })),
  removeFavorite: (id) => set((state) => ({ ids: state.ids.filter((item) => item !== id) })),
  clearFavorites: () => set({ ids: [] }),
}));
