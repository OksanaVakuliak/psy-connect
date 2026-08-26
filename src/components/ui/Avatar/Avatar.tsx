import Image from 'next/image';
import { IconUser } from '@tabler/icons-react';
import styles from './Avatar.module.css';

const FALLBACK_ICON_RATIO = 0.625;

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export function Avatar({ src, alt = '', size = 32, className }: AvatarProps) {
  return (
    <span
      className={[styles.avatar, className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image className={styles.image} src={src} alt={alt} width={size} height={size} />
      ) : (
        <IconUser size={Math.round(size * FALLBACK_ICON_RATIO)} aria-hidden="true" />
      )}
    </span>
  );
}
