import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import Providers from '@/components/Providers/Providers';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import styles from './layout.module.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: {
    default: 'PsyConnect',
    template: '%s | PsyConnect',
  },
  description: 'Find a licensed psychologist and book an online session',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Providers>
          <main className={styles.main}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
