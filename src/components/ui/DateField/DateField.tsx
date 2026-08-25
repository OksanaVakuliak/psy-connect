'use client';

import { useId, type ComponentPropsWithoutRef } from 'react';
import { Field, controlClassName, fieldErrorId } from '../Field/Field';
import { CalendarIcon } from '../icons/CalendarIcon';
import styles from './DateField.module.css';

interface DateFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'type'> {
  label: string;
  error?: string;
}

export function DateField({ label, error, ...props }: DateFieldProps) {
  const fieldId = useId();

  return (
    <Field id={fieldId} label={label} error={error}>
      <div className={controlClassName({ error, className: styles.control })}>
        <input
          {...props}
          id={fieldId}
          className={styles.input}
          type="date"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? fieldErrorId(fieldId) : undefined}
        />

        <CalendarIcon className={styles.icon} />
      </div>
    </Field>
  );
}
