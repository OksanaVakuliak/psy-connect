import approaches from './approaches.json';
import specializations from './specializations.json';

export const ALL_OPTION = 'All';

export const PAGE_SIZE = 4;

export const SPECIALIZATION_OPTIONS = [ALL_OPTION, ...specializations];

export const APPROACH_OPTIONS = [ALL_OPTION, ...approaches];

export const PRICE_OPTIONS = [ALL_OPTION, 'Under $50', 'Under $100'] as const;

export type PriceOption = (typeof PRICE_OPTIONS)[number];

export const PRICE_MAX_BY_OPTION: Record<PriceOption, number | undefined> = {
  [ALL_OPTION]: undefined,
  'Under $50': 50,
  'Under $100': 100,
};
