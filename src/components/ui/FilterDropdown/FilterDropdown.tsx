'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { ALL_OPTION } from '@/constants/filters';
import { CheckIcon } from '../icons/CheckIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import styles from './FilterDropdown.module.css';

interface FilterDropdownProps {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  const baseId = useId();
  const listId = `${baseId}-list`;
  const optionId = (index: number) => `${baseId}-option-${index}`;

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeOptionRef = useRef<HTMLLIElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    if (isOpen) {
      activeOptionRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, activeIndex]);

  const open = () => {
    const selectedIndex = options.indexOf(value);

    setActiveIndex(selectedIndex === -1 ? 0 : selectedIndex);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const select = (option: string) => {
    onChange(option);
    close();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          close();
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();

        if (isOpen) {
          select(options[activeIndex]);
        } else {
          open();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();

        if (isOpen) {
          setActiveIndex((index) => Math.min(index + 1, options.length - 1));
        } else {
          open();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();

        if (isOpen) {
          setActiveIndex((index) => Math.max(index - 1, 0));
        } else {
          open();
        }
        break;
      case 'Home':
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(options.length - 1);
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
    <div ref={rootRef} className={styles.dropdown}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-label={`${label}: ${value}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
      >
        <span className={styles.text}>{value === ALL_OPTION ? label : value}</span>
        <ChevronDownIcon className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} />
      </button>

      {isOpen && (
        <ul id={listId} className={styles.list} role="listbox" aria-label={label}>
          {options.map((option, index) => {
            const isSelected = option === value;
            const isActive = index === activeIndex;

            return (
              <li
                key={option}
                ref={isActive ? activeOptionRef : undefined}
                id={optionId(index)}
                className={[
                  styles.option,
                  isActive && styles.optionActive,
                  isSelected && styles.optionSelected,
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="option"
                aria-selected={isSelected}
                onClick={() => select(option)}
                onMouseMove={() => setActiveIndex(index)}
              >
                {option}
                {isSelected && <CheckIcon />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
