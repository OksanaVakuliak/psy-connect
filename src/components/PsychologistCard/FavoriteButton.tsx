'use client';

import { HeartIcon, HeartOutlineIcon } from '@/components/ui';
import { useToggleFavorite } from '@/hooks/useToggleFavorite';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import styles from './PsychologistCard.module.css';

interface FavoriteButtonProps {
  psychologistId: string;
  name: string;
}

export default function FavoriteButton({ psychologistId, name }: FavoriteButtonProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const showSignInNotice = useAuthStore((state) => state.showSignInNotice);
  const isFavorite = useFavoritesStore((state) => state.ids.includes(psychologistId));
  const { mutate, isPending } = useToggleFavorite();

  const toggle = () => {
    if (!isLoggedIn) {
      showSignInNotice();
      return;
    }

    if (isPending) {
      return;
    }

    mutate({ id: psychologistId, isFavorite });
  };

  return (
    <button
      type="button"
      className={styles.favorite}
      disabled={isAuthLoading}
      aria-busy={isPending}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
      onClick={toggle}
    >
      {isFavorite ? <HeartIcon /> : <HeartOutlineIcon />}
    </button>
  );
}
