'use client';

import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const TOAST_DURATION = 4000;

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: TOAST_DURATION,
          style: {
            maxWidth: '400px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-subtle)',
            background: 'var(--color-surface)',
            boxShadow: 'var(--shadow-lg)',
            color: 'var(--color-text)',
            fontSize: 'var(--text-sm)',
            lineHeight: 'var(--text-sm-line)',
            letterSpacing: 'var(--text-sm-spacing)',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-primary)',
              secondary: 'var(--color-surface)',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
