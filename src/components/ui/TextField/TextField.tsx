'use client';

import { useId, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { Field, controlClassName, fieldErrorId } from '../Field/Field';
import styles from './TextField.module.css';

const TOGGLE_ICON_SIZE = 22;

interface TextFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'id'> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

export function TextField({ label, error, icon, type = 'text', ...props }: TextFieldProps) {
  const fieldId = useId();
  const [isRevealed, setIsRevealed] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && isRevealed ? 'text' : type;

  return (
    <Field id={fieldId} label={label} error={error}>
      <div className={controlClassName({ error })}>
        {icon}

        <input
          {...props}
          id={fieldId}
          className={styles.input}
          type={inputType}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? fieldErrorId(fieldId) : undefined}
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
    </Field>
  );
}
