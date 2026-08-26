'use client';

import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { Field, controlClassName, fieldErrorId } from '../Field/Field';
import { CalendarIcon } from '../icons/CalendarIcon';
import { Calendar } from '../Calendar/Calendar';
import { dateLabel } from '@/lib/dates';
import styles from './DateField.module.css';

interface DateFieldProps {
  label: string;
  placeholder: string;
  value: string;
  min?: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export function DateField({
  label,
  placeholder,
  value,
  min,
  error,
  onChange,
  onBlur,
}: DateFieldProps) {
  const fieldId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!rootRef.current?.contains(event.relatedTarget)) {
      onBlur?.();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      close();
    }
  };

  return (
    <Field id={fieldId} label={label} error={error}>
      <div ref={rootRef} className={styles.field} onBlur={handleBlur}>
        <button
          ref={triggerRef}
          id={fieldId}
          type="button"
          className={controlClassName({ error, isActive: isOpen, className: styles.trigger })}
          onClick={() => (isOpen ? close() : setIsOpen(true))}
          onKeyDown={handleKeyDown}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-describedby={error ? fieldErrorId(fieldId) : undefined}
        >
          <span className={value ? styles.value : styles.placeholder}>
            {value ? dateLabel(value) : placeholder}
          </span>

          <CalendarIcon className={styles.icon} />
        </button>

        {isOpen && (
          <div className={styles.popover}>
            <Calendar
              value={value}
              min={min}
              labelledBy={fieldId}
              onSelect={(day) => {
                onChange(day);
                close();
              }}
              onDismiss={close}
            />
          </div>
        )}
      </div>
    </Field>
  );
}
