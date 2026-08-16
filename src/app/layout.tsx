import type { Metadata } from 'next';
import AuthModal from '@/components/AuthModal/AuthModal';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Providers from '@/components/Providers/Providers';
import { manrope } from './fonts';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import styles from './layout.module.css';

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
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
          <AuthModal />
        </Providers>
      </body>
    </html>
  );
}
