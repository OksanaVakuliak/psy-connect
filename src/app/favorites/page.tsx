import type { Metadata } from 'next';
import RequireAuth from '@/components/RequireAuth/RequireAuth';

export const metadata: Metadata = {
  title: 'Favorites',
};

export default function FavoritesPage() {
  return (
    <RequireAuth>
      <section className="container">
        <h1>Favorites</h1>
      </section>
    </RequireAuth>
  );
}
