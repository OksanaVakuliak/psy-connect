'use client';

import { useId, useState, type ComponentPropsWithoutRef } from 'react';
import { IconAlertCircle, IconEye, IconEyeOff, type TablerIcon } from '@tabler/icons-react';
import styles from './TextField.module.css';

const ICON_SIZE = 20;
const TOGGLE_ICON_SIZE = 22;
const ERROR_ICON_SIZE = 16;

interface TextFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'id'> {
  label: string;
  error?: string;
  icon?: TablerIcon;
}

export function TextField({ label, error, icon: Icon, type = 'text', ...props }: TextFieldProps) {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const [isRevealed, setIsRevealed] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && isRevealed ? 'text' : type;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
      </label>

      <div className={[styles.control, error && styles.invalid].filter(Boolean).join(' ')}>
        {Icon && <Icon size={ICON_SIZE} aria-hidden="true" />}

        <input
          {...props}
          id={fieldId}
          className={styles.input}
          type={inputType}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setIsRevealed((revealed) => !revealed)}
            aria-label={isRevealed ? 'Hide password' : 'Show password'}
          >
            {isRevealed ? (
              <IconEyeOff size={TOGGLE_ICON_SIZE} />
            ) : (
              <IconEye size={TOGGLE_ICON_SIZE} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className={styles.error} id={errorId}>
          <IconAlertCircle size={ERROR_ICON_SIZE} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
