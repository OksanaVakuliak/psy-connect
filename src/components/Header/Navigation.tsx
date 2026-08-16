'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconHeartFilled, type TablerIcon } from '@tabler/icons-react';
import { useAuthStore } from '@/store/authStore';
import styles from './Header.module.css';

const HEART_SIZE = 16;

interface NavLink {
  href: string;
  label: string;
  Icon?: TablerIcon;
}

const PUBLIC_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/psychologists', label: 'Psychologists' },
];

const FAVORITES_LINK: NavLink = { href: '/favorites', label: 'Favorites', Icon: IconHeartFilled };

export default function Navigation() {
  const pathname = usePathname();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const links = isLoggedIn ? [...PUBLIC_LINKS, FAVORITES_LINK] : PUBLIC_LINKS;

  return (
    <nav aria-label="Main">
      <ul className={styles.nav}>
        {links.map(({ href, label, Icon }) => {
          const isActive = href === '/' ? pathname === href : pathname.startsWith(href);

          return (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
                {Icon && <Icon size={HEART_SIZE} />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
