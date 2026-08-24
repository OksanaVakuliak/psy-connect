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

    // A second click before the answer arrives would race the first one.
    if (isPending) {
      return;
    }

    mutate({ id: psychologistId, isFavorite });
  };

  return (
    <button
      type="button"
      className={styles.favorite}
      // The session decides what the click does, so the heart waits for it to be restored. A
      // request in flight only marks the button busy: disabling it would drop keyboard focus
      // mid-toggle, and the click it would swallow is ignored either way.
      disabled={isAuthLoading}
      aria-busy={isPending}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
      onClick={toggle}
    >
      {/* The mockup marks a saved specialist by filling the same heart, not by recoloring it. */}
      {isFavorite ? <HeartIcon /> : <HeartOutlineIcon />}
    </button>
  );
}
