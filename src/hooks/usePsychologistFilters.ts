'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ALL_OPTION,
  APPROACH_OPTIONS,
  PRICE_MAX_BY_OPTION,
  PRICE_OPTIONS,
  SPECIALIZATION_OPTIONS,
  type PriceOption,
} from '@/constants/filters';

const SPECIALIZATION_PARAM = 'specialization';
const APPROACH_PARAM = 'approach';
const PRICE_MAX_PARAM = 'price_max';

interface PsychologistFilters {
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

function toHref(pathname: string, query: string): string {
  return query ? `${pathname}?${query}` : pathname;
}

// Compares query strings by content, so only a real difference counts, not the order of the params.
function sortQuery(query: string): string {
  const params = new URLSearchParams(query);

  params.sort();

  return params.toString();
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

  const currentQuery = searchParams.toString();
  const filtersQuery = toSearchParams(filters).toString();

  const replaceQuery = (query: string) => {
    router.replace(toHref(pathname, query), { scroll: false });
  };

  // A shared link can carry unknown values or leftovers such as pagination. The UI ignores them,
  // so the address bar is brought in line with what is actually applied.
  useEffect(() => {
    if (sortQuery(currentQuery) !== sortQuery(filtersQuery)) {
      router.replace(toHref(pathname, filtersQuery), { scroll: false });
    }
  }, [currentQuery, filtersQuery, pathname, router]);

  // The query string is rebuilt from the filters alone, so pagination never survives a filter change.
  const applyFilters = (next: PsychologistFilters) => replaceQuery(toSearchParams(next).toString());

  return {
    filters,
    hasActiveFilters,
    setSpecialization: (value: string) =>
      applyFilters({ ...filters, specialization: toOption(value, SPECIALIZATION_OPTIONS) }),
    setApproach: (value: string) =>
      applyFilters({ ...filters, approach: toOption(value, APPROACH_OPTIONS) }),
    setPrice: (value: string) => applyFilters({ ...filters, price: toPriceOption(value) }),
    clearFilters: () => replaceQuery(''),
  };
}
