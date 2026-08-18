import type { Metadata } from 'next';
import { connection } from 'next/server';
import FilterBar from '@/components/FilterBar/FilterBar';
import PsychologistList from '@/components/PsychologistList/PsychologistList';
import PsychologistsPageTitle from '@/components/PsychologistsPageTitle/PsychologistsPageTitle';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Psychologists',
};

export default async function PsychologistsPage() {
  // The filter bar reads the query string, so the route is rendered per request
  // and the current filter values ship with the first HTML.
  await connection();

  return (
    <section className={`container ${styles.page}`}>
      <PsychologistsPageTitle />

      <FilterBar />

      <PsychologistList />
    </section>
  );
}
