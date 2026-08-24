'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { PAGE_SIZE } from '@/constants/filters';
import { getPsychologists } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import type { PsychologistsQuery } from '@/types';

export function usePsychologists(query: PsychologistsQuery) {
  return useInfiniteQuery({
    queryKey: queryKeys.psychologists.list(query),
    queryFn: ({ pageParam }) => getPsychologists({ ...query, page: pageParam, limit: PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const loaded = pages.reduce((count, page) => count + page.items.length, 0);

      return loaded < lastPage.total ? pages.length + 1 : undefined;
    },
  });
}
