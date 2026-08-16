import Link from 'next/link';
import { LogoMark } from '../icons/LogoMark';
import styles from './Logo.module.css';

type LogoSize = 'sm' | 'md';

const MARK_SIZE: Record<LogoSize, number> = {
  sm: 20,
  md: 24,
};

interface LogoProps {
  size?: LogoSize;
  className?: string;
}

export function Logo({ size = 'sm', className }: LogoProps) {
  return (
    <Link href="/" className={[styles.logo, styles[size], className].filter(Boolean).join(' ')}>
      <LogoMark size={MARK_SIZE[size]} />
      PsyConnect
    </Link>
  );
}
