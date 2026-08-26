import type { Metadata } from 'next';
import FavoritesList from '@/components/FavoritesList/FavoritesList';
import FavoritesPageTitle from '@/components/FavoritesPageTitle/FavoritesPageTitle';
import RequireAuth from '@/components/RequireAuth/RequireAuth';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Favorites',
  description: 'The psychologists you saved for later',
};

export default function FavoritesPage() {
  return (
    <RequireAuth>
      <section className={`container ${styles.page}`}>
        <FavoritesPageTitle />

        <FavoritesList />
      </section>
    </RequireAuth>
  );
}
