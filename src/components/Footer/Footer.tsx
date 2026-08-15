import Link from 'next/link';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconLeaf,
} from '@tabler/icons-react';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/', Icon: IconBrandInstagram },
  { label: 'Facebook', href: 'https://www.facebook.com/', Icon: IconBrandFacebook },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', Icon: IconBrandLinkedin },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <IconLeaf className={styles.logoIcon} size={24} stroke={2} />
          PsyConnect
        </Link>

        <p className={styles.copyright}>&copy; 2025 PsyConnect. All rights reserved.</p>

        <ul className={styles.socials}>
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                className={styles.socialLink}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={20} stroke={1.75} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
