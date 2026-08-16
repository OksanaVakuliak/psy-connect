import Image from 'next/image';
import {
  IconArrowRight,
  IconRosetteDiscountCheck,
  IconShieldCheck,
  IconStarFilled,
} from '@tabler/icons-react';
import { ButtonLink } from '@/components/ui';
import styles from './HeroSection.module.css';

const IMAGE_WIDTH = 632;
const IMAGE_HEIGHT = 500;
const TAGLINE_ICON_SIZE = 16;
const BADGE_ICON_SIZE = 16;
const ARROW_ICON_SIZE = 12;

export default function HeroSection() {
  return (
    <section className={`container ${styles.hero}`}>
      <div className={styles.content}>
        <p className={styles.tagline}>
          <IconRosetteDiscountCheck size={TAGLINE_ICON_SIZE} aria-hidden="true" />
          Your mental health matters
        </p>

        <h1>Find Your Perfect Psychologist Online</h1>

        <p className={styles.subtitle}>
          Connect with licensed therapists and coaches who understand your needs. Start your journey
          to better mental health today.
        </p>

        <ButtonLink href="/psychologists" size="md">
          Get Started
          <IconArrowRight size={ARROW_ICON_SIZE} aria-hidden="true" />
        </ButtonLink>
      </div>

      <div className={styles.illustration}>
        <Image
          className={styles.image}
          src="/hero.webp"
          alt="Woman smiling during an online therapy session at home"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          sizes="(max-width: 1280px) 45vw, 632px"
          priority
        />

        <p className={`${styles.badge} ${styles.badgeTop}`}>
          <span className={styles.badgeIcon}>
            <IconShieldCheck size={BADGE_ICON_SIZE} aria-hidden="true" />
          </span>
          Licensed Specialists
        </p>

        <p className={`${styles.badge} ${styles.badgeBottom}`}>
          <span className={`${styles.badgeIcon} ${styles.badgeIconRating}`}>
            <IconStarFilled size={BADGE_ICON_SIZE} aria-hidden="true" />
          </span>
          4.8 Average Rating
        </p>
      </div>
    </section>
  );
}
