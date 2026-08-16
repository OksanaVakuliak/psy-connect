import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'outline';
type ButtonSize = 'sm' | 'md';

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

type ButtonProps = ButtonStyleProps & ComponentPropsWithoutRef<'button'>;
type ButtonLinkProps = ButtonStyleProps & ComponentPropsWithoutRef<typeof Link>;

function buttonClassName({ variant = 'primary', size = 'sm', className }: ButtonStyleProps) {
  return [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ');
}

export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return (
    <button className={buttonClassName({ variant, size, className })} type={type} {...props} />
  );
}

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClassName({ variant, size, className })} {...props} />;
}
