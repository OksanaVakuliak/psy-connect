'use client';

import { useId } from 'react';
import { ALL_OPTION } from '@/constants/filters';
import { useListbox } from '@/hooks/useListbox';
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

  return (
    <div ref={rootRef} className={styles.dropdown}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={toggle}
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
        <div className={styles.panel}>
          <ul id={listId} className={styles.list} role="listbox" aria-label={label}>
            {options.map((option, index) => {
              const isSelected = option === value;

              return (
                <li
                  key={option}
                  ref={index === activeIndex ? activeOptionRef : undefined}
                  id={optionId(index)}
                  className={[
                    styles.option,
                    index === activeIndex && styles.optionActive,
                    isSelected && styles.optionSelected,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => select(option)}
                  onMouseMove={() => hover(index)}
                >
                  {option}
                  {isSelected && <CheckIcon />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
