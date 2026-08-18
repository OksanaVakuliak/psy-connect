import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'outline' | 'outlinePrimary';
type ButtonSize = 'sm' | 'md';

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

type ButtonProps = ButtonStyleProps & ComponentPropsWithoutRef<'button'>;
type ButtonLinkProps = ButtonStyleProps & ComponentPropsWithoutRef<typeof Link>;

function buttonClassName({
  variant = 'primary',
  size = 'sm',
  fullWidth,
  className,
}: ButtonStyleProps) {
  return [styles.button, styles[variant], styles[size], fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(' ');
}

export function Button({
  variant,
  size,
  fullWidth,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClassName({ variant, size, fullWidth, className })}
      type={type}
      {...props}
    />
  );
}

export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClassName({ variant, size, fullWidth, className })} {...props} />;
}
