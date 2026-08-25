'use client';

import { useId, type MouseEvent } from 'react';
import { useListbox } from '@/hooks/useListbox';
import { Field, controlClassName, fieldErrorId } from '../Field/Field';
import { CaretDownIcon } from '../icons/CaretDownIcon';
import styles from './SelectField.module.css';

interface SelectFieldProps {
  label: string;
  placeholder: string;
  options: readonly string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export function SelectField({
  label,
  placeholder,
  options,
  value,
  error,
  onChange,
  onBlur,
}: SelectFieldProps) {
  const fieldId = useId();
  const listId = `${fieldId}-list`;
  const optionId = (index: number) => `${fieldId}-option-${index}`;

  const {
    isOpen,
    activeIndex,
    rootRef,
    triggerRef,
    activeOptionRef,
    toggle,
    select,
    hover,
    handleKeyDown,
  } = useListbox({ options, value, onSelect: onChange });

  const keepFocus = (event: MouseEvent<HTMLUListElement>) => event.preventDefault();

  return (
    <Field id={fieldId} label={label} error={error}>
      <div ref={rootRef} className={styles.select}>
        <button
          ref={triggerRef}
          id={fieldId}
          type="button"
          className={controlClassName({ error, isActive: isOpen, className: styles.trigger })}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listId : undefined}
          aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? fieldErrorId(fieldId) : undefined}
        >
          <span className={value ? styles.value : styles.placeholder}>{value || placeholder}</span>
          <CaretDownIcon className={`${styles.caret} ${isOpen ? styles.caretOpen : ''}`} />
        </button>

        {isOpen && (
          <ul
            id={listId}
            className={styles.list}
            role="listbox"
            aria-label={label}
            onMouseDown={keepFocus}
          >
            {options.map((option, index) => (
              <li
                key={option}
                ref={index === activeIndex ? activeOptionRef : undefined}
                id={optionId(index)}
                className={[
                  styles.option,
                  option === value && styles.optionSelected,
                  index === activeIndex && styles.optionActive,
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="option"
                aria-selected={option === value}
                onClick={() => select(option)}
                onMouseMove={() => hover(index)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Field>
  );
}
