'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
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
  onClose?: () => void;
}

export function SelectField({
  label,
  placeholder,
  options,
  value,
  error,
  onChange,
  onClose,
}: SelectFieldProps) {
  const fieldId = useId();
  const listId = `${fieldId}-list`;
  const optionId = (index: number) => `${fieldId}-option-${index}`;

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeOptionRef = useRef<HTMLLIElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Only the keyboard asks to be followed: scrolling after a hover would drag the option out from
  // under the pointer, which fires another hover, and the list would never settle.
  const shouldRevealActiveRef = useRef(false);

  const activeOption = options[activeIndex];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !shouldRevealActiveRef.current) {
      return;
    }

    shouldRevealActiveRef.current = false;
    activeOptionRef.current?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, activeIndex]);

  const open = () => {
    const selectedIndex = options.indexOf(value);

    shouldRevealActiveRef.current = true;
    setActiveIndex(selectedIndex === -1 ? 0 : selectedIndex);
    setIsOpen(true);
  };

  const moveActive = (move: (index: number) => number) => {
    shouldRevealActiveRef.current = true;
    setActiveIndex(move);
  };

  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
    onClose?.();
  };

  const select = (option: string) => {
    onChange(option);
    close();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'Escape':
        if (isOpen) {
          // Keeps the surrounding modal open: it only closes on an Escape nobody has handled yet.
          event.preventDefault();
          close();
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();

        if (!isOpen) {
          open();
        } else if (activeOption !== undefined) {
          select(activeOption);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();

        if (isOpen) {
          moveActive((index) => Math.min(index + 1, options.length - 1));
        } else {
          open();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();

        if (isOpen) {
          moveActive((index) => Math.max(index - 1, 0));
        } else {
          open();
        }
        break;
      case 'Home':
        if (isOpen) {
          event.preventDefault();
          moveActive(() => 0);
        }
        break;
      case 'End':
        if (isOpen) {
          event.preventDefault();
          moveActive(() => options.length - 1);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <Field id={fieldId} label={label} error={error}>
      <div ref={rootRef} className={styles.select}>
        <button
          ref={triggerRef}
          id={fieldId}
          type="button"
          className={controlClassName({ error, isActive: isOpen, className: styles.trigger })}
          onClick={() => (isOpen ? close() : open())}
          onKeyDown={handleKeyDown}
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
          <ul id={listId} className={styles.list} role="listbox" aria-label={label}>
            {options.map((option, index) => {
              const isActive = index === activeIndex;

              return (
                <li
                  key={option}
                  ref={isActive ? activeOptionRef : undefined}
                  id={optionId(index)}
                  className={[
                    styles.option,
                    option === value && styles.optionSelected,
                    isActive && styles.optionActive,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  role="option"
                  aria-selected={option === value}
                  onClick={() => select(option)}
                  onMouseMove={() => setActiveIndex(index)}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Field>
  );
}
