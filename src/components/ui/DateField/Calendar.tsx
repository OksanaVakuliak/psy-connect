'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import {
  dateLabel,
  endOfWeek,
  isSameMonth,
  monthGrid,
  monthLabel,
  shiftDays,
  shiftMonths,
  startOfWeek,
  today,
} from '@/lib/dates';
import styles from './DateField.module.css';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

interface CalendarProps {
  value: string;
  min?: string;
  labelledBy: string;
  onSelect: (value: string) => void;
  onDismiss: () => void;
}

export function Calendar({ value, min, labelledBy, onSelect, onDismiss }: CalendarProps) {
  const gridRef = useRef<HTMLTableElement>(null);
  const [focused, setFocused] = useState(() => {
    const start = value || today();

    return min && start < min ? min : start;
  });

  useEffect(() => {
    gridRef.current?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus();
  }, [focused]);

  const isDisabled = (day: string) => Boolean(min) && day < min!;

  const move = (day: string) => {
    if (!isDisabled(day)) {
      setFocused(day);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTableElement>) => {
    const moves: Record<string, () => string> = {
      ArrowLeft: () => shiftDays(focused, -1),
      ArrowRight: () => shiftDays(focused, 1),
      ArrowUp: () => shiftDays(focused, -7),
      ArrowDown: () => shiftDays(focused, 7),
      Home: () => startOfWeek(focused),
      End: () => endOfWeek(focused),
      PageUp: () => shiftMonths(focused, -1),
      PageDown: () => shiftMonths(focused, 1),
    };

    if (event.key === 'Escape') {
      // Leaves the surrounding modal alone: it closes on an Escape nobody has handled yet.
      event.preventDefault();
      onDismiss();
      return;
    }

    const next = moves[event.key];

    if (next) {
      event.preventDefault();
      move(next());
    }
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.month}>
        <button
          type="button"
          className={styles.step}
          onClick={() => setFocused(shiftMonths(focused, -1))}
          aria-label="Previous month"
        >
          <ChevronDownIcon className={styles.stepBack} />
        </button>

        <p className={styles.monthLabel} aria-live="polite">
          {monthLabel(focused)}
        </p>

        <button
          type="button"
          className={styles.step}
          onClick={() => setFocused(shiftMonths(focused, 1))}
          aria-label="Next month"
        >
          <ChevronDownIcon className={styles.stepForward} />
        </button>
      </div>

      <table
        ref={gridRef}
        className={styles.grid}
        role="grid"
        aria-labelledby={labelledBy}
        onKeyDown={handleKeyDown}
      >
        <thead>
          <tr>
            {WEEKDAYS.map((weekday) => (
              <th key={weekday} className={styles.weekday} scope="col">
                {weekday}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {monthGrid(focused).map((week) => (
            <tr key={week[0]}>
              {week.map((day) => (
                <td key={day} role="gridcell" aria-selected={day === value}>
                  <button
                    type="button"
                    className={[
                      styles.day,
                      !isSameMonth(day, focused) && styles.dayOutside,
                      day === today() && styles.dayToday,
                      day === value && styles.daySelected,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    disabled={isDisabled(day)}
                    tabIndex={day === focused ? 0 : -1}
                    aria-label={dateLabel(day)}
                    onClick={() => onSelect(day)}
                  >
                    {Number(day.slice(-2))}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
