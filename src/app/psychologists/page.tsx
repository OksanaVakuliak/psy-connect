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
  await connection();

  return (
    <section className={`container ${styles.page}`}>
      <PsychologistsPageTitle />

      <FilterBar />

      <PsychologistList />
    </section>
  );
}
