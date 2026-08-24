'use client';

import { APPROACH_OPTIONS, PRICE_OPTIONS, SPECIALIZATION_OPTIONS } from '@/constants/filters';
import { FilterDropdown, FiltersIcon } from '@/components/ui';
import { usePsychologistFilters } from '@/hooks/usePsychologistFilters';
import styles from './FilterBar.module.css';

export default function FilterBar() {
  const { filters, hasActiveFilters, setSpecialization, setApproach, setPrice, clearFilters } =
    usePsychologistFilters();

  return (
    <div className={styles.bar}>
      <p className={styles.title}>
        <FiltersIcon />
        Filters
      </p>

      <div className={styles.controls}>
        <FilterDropdown
          label="Specialization"
          options={SPECIALIZATION_OPTIONS}
          value={filters.specialization}
          onChange={setSpecialization}
        />

        <FilterDropdown
          label="Therapeutic Approach"
          options={APPROACH_OPTIONS}
          value={filters.approach}
          onChange={setApproach}
        />

        <FilterDropdown
          label="Price per Session"
          options={PRICE_OPTIONS}
          value={filters.price}
          onChange={setPrice}
        />
      </div>

      <button
        type="button"
        className={[styles.clear, !hasActiveFilters && styles.clearHidden]
          .filter(Boolean)
          .join(' ')}
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}
