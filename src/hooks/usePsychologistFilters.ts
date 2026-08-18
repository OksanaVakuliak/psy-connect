'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ALL_OPTION,
  APPROACH_OPTIONS,
  PRICE_MAX_BY_OPTION,
  PRICE_OPTIONS,
  SPECIALIZATION_OPTIONS,
  type PriceOption,
} from '@/constants/filters';

export const SPECIALIZATION_PARAM = 'specialization';
export const APPROACH_PARAM = 'approach';
export const PRICE_MAX_PARAM = 'price_max';

export interface PsychologistFilters {
  specialization: string;
  approach: string;
  price: PriceOption;
}

function toOption(value: string | null, options: readonly string[]): string {
  return value && options.includes(value) ? value : ALL_OPTION;
}

function toPriceOption(value: string | null): PriceOption {
  return PRICE_OPTIONS.find((option) => option === value) ?? ALL_OPTION;
}

function toPriceOptionByMax(priceMax: string | null): PriceOption {
  return (
    PRICE_OPTIONS.find((option) => `${PRICE_MAX_BY_OPTION[option] ?? ''}` === priceMax) ??
    ALL_OPTION
  );
}

function toSearchParams({ specialization, approach, price }: PsychologistFilters): URLSearchParams {
  const params = new URLSearchParams();
  const priceMax = PRICE_MAX_BY_OPTION[price];

  if (specialization !== ALL_OPTION) {
    params.set(SPECIALIZATION_PARAM, specialization);
  }

  if (approach !== ALL_OPTION) {
    params.set(APPROACH_PARAM, approach);
  }

  if (priceMax !== undefined) {
    params.set(PRICE_MAX_PARAM, `${priceMax}`);
  }

  return params;
}

export function usePsychologistFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: PsychologistFilters = {
    specialization: toOption(searchParams.get(SPECIALIZATION_PARAM), SPECIALIZATION_OPTIONS),
    approach: toOption(searchParams.get(APPROACH_PARAM), APPROACH_OPTIONS),
    price: toPriceOptionByMax(searchParams.get(PRICE_MAX_PARAM)),
  };

  const hasActiveFilters =
    filters.specialization !== ALL_OPTION ||
    filters.approach !== ALL_OPTION ||
    filters.price !== ALL_OPTION;

  // The query string is rewritten from the filters alone, so pagination never survives a filter change.
  const applyFilters = (next: PsychologistFilters) => {
    const query = toSearchParams(next).toString();

    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return {
    filters,
    hasActiveFilters,
    setSpecialization: (value: string) =>
      applyFilters({ ...filters, specialization: toOption(value, SPECIALIZATION_OPTIONS) }),
    setApproach: (value: string) =>
      applyFilters({ ...filters, approach: toOption(value, APPROACH_OPTIONS) }),
    setPrice: (value: string) => applyFilters({ ...filters, price: toPriceOption(value) }),
    clearFilters: () => router.replace(pathname, { scroll: false }),
  };
}
