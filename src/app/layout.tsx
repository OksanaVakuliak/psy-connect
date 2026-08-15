import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PsyConnect',
  description: 'Find a licensed psychologist and book an online session',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
