'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import {
  BriefcaseIcon,
  Button,
  CaretDownIcon,
  GiftIcon,
  GlobeIcon,
  HeartIcon,
  StarOutlineIcon,
  Tag,
} from '@/components/ui';
import { toLanguageCode } from '@/constants/languages';
import type { Psychologist } from '@/types';
import PsychologistCardDetails from './PsychologistCardDetails';
import styles from './PsychologistCard.module.css';

const AVATAR_SIZE = 80;

interface PsychologistCardProps {
  psychologist: Psychologist;
}

export default function PsychologistCard({ psychologist }: PsychologistCardProps) {
  const {
    name,
    avatar_url,
    specialization,
    approaches,
    languages,
    price_per_hour,
    experience_years,
    rating,
    reviews,
    about,
    conditions,
    initial_consultation,
  } = psychologist;

  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();

  return (
    <article className={`${styles.card} ${initial_consultation ? styles.cardWithBadge : ''}`}>
      {initial_consultation && (
        <p className={styles.badge}>
          <GiftIcon />
          Free first session
        </p>
      )}

      <button type="button" className={styles.favorite} aria-label={`Add ${name} to favorites`}>
        <HeartIcon />
      </button>

      <div className={styles.identity}>
        <Image
          className={styles.avatar}
          src={avatar_url}
          alt=""
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
        />

        <div className={styles.identityText}>
          <h3>{name}</h3>

          <p className={styles.meta}>
            <span className={styles.metaItem}>
              <StarOutlineIcon className={styles.ratingIcon} />
              {rating.toFixed(1)}
            </span>

            <span className={styles.metaItem}>
              <BriefcaseIcon className={styles.metaIcon} />
              {experience_years} yrs exp.
            </span>

            <span className={styles.metaItem}>
              <GlobeIcon className={styles.metaIcon} />
              {languages.map(toLanguageCode).join('/')}
            </span>
          </p>

          <ul className={styles.tagList}>
            {specialization.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </ul>
        </div>
      </div>

      <p className={isExpanded ? styles.about : styles.aboutClamped}>{about}</p>

      <ul className={`${styles.tagList} ${styles.conditions}`}>
        {conditions.map((condition) => (
          <Tag key={condition} variant="outline">
            {condition}
          </Tag>
        ))}
      </ul>

      {isExpanded && (
        <PsychologistCardDetails id={detailsId} approaches={approaches} reviews={reviews} />
      )}

      <footer className={styles.footer}>
        <p className={styles.price}>
          <b className={styles.priceValue}>${price_per_hour}</b>
          <span className={styles.priceUnit}>/ session</span>
        </p>

        <div className={styles.actions}>
          <Button
            variant="outline"
            aria-expanded={isExpanded}
            aria-controls={isExpanded ? detailsId : undefined}
            onClick={() => setIsExpanded((expanded) => !expanded)}
          >
            {isExpanded ? 'Read less' : 'Read more'}
            <CaretDownIcon className={isExpanded ? styles.caretUp : styles.caret} />
          </Button>

          <Button>Book a session</Button>
        </div>
      </footer>
    </article>
  );
}
