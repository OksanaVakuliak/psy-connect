import type { Metadata } from 'next';
import { Suspense } from 'react';
import FilterBar from '@/components/FilterBar/FilterBar';
import FilterBarFallback from '@/components/FilterBar/FilterBarFallback';
import PsychologistsPageTitle from '@/components/PsychologistsPageTitle/PsychologistsPageTitle';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Psychologists',
};

export default function PsychologistsPage() {
  return (
    <section className={`container ${styles.page}`}>
      <PsychologistsPageTitle />

      <Suspense fallback={<FilterBarFallback />}>
        <FilterBar />
      </Suspense>
    </section>
  );
}
