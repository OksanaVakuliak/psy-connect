import type { ReactNode } from 'react';
import { AlertCircleIcon } from '../icons/AlertCircleIcon';
import styles from './Field.module.css';

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

interface ControlClassNameOptions {
  error?: string;
  isActive?: boolean;
  className?: string;
}

/** Id of the message `Field` renders for `error`, for `aria-describedby` on the control. */
export function fieldErrorId(id: string) {
  return `${id}-error`;
}

/** Shared look of the boxed control every field wraps around its own input or trigger. */
export function controlClassName({ error, isActive, className }: ControlClassNameOptions = {}) {
  return [styles.control, error && styles.invalid, isActive && styles.active, className]
    .filter(Boolean)
    .join(' ');
}

export function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label
        className={[styles.label, error && styles.invalidLabel].filter(Boolean).join(' ')}
        htmlFor={id}
      >
        {label}
      </label>

      {children}

      {error && (
        <p className={styles.error} id={fieldErrorId(id)}>
          <AlertCircleIcon className={styles.errorIcon} />
          {error}
        </p>
      )}
    </div>
  );
}
