'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

interface UseListboxParams {
  options: readonly string[];
  value: string;
  onSelect: (option: string) => void;
}

/**
 * The behaviour every listbox trigger in the library shares: opening on the pointer or the
 * keyboard, walking the options with the arrows, and closing on Escape, Tab or a click outside.
 * Each component keeps its own markup and styling and only borrows this.
 */
export function useListbox({ options, value, onSelect }: UseListboxParams) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeOptionRef = useRef<HTMLLIElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Only the keyboard asks to be followed: scrolling after a hover would drag the option out from
  // under the pointer, which fires another hover, and the list would never settle.
  const shouldRevealActiveRef = useRef(false);

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

  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const select = (option: string) => {
    onSelect(option);
    close();
  };

  // Guarded, because an arrow that runs into the end of the list leaves the index alone: the
  // effect above would never run, and the request to scroll would sit there waiting for a hover.
  const moveActiveTo = (index: number) => {
    if (index === activeIndex) {
      return;
    }

    shouldRevealActiveRef.current = true;
    setActiveIndex(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'Escape':
        if (isOpen) {
          // Keeps a surrounding modal open: it closes only on an Escape nobody has handled yet.
          event.preventDefault();
          close();
        }
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();

        const activeOption = options[activeIndex];

        if (!isOpen) {
          open();
        } else if (activeOption !== undefined) {
          select(activeOption);
        }
        break;
      }
      case 'ArrowDown':
        event.preventDefault();

        if (isOpen) {
          moveActiveTo(Math.min(activeIndex + 1, options.length - 1));
        } else {
          open();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();

        if (isOpen) {
          moveActiveTo(Math.max(activeIndex - 1, 0));
        } else {
          open();
        }
        break;
      case 'Home':
        if (isOpen) {
          event.preventDefault();
          moveActiveTo(0);
        }
        break;
      case 'End':
        if (isOpen) {
          event.preventDefault();
          moveActiveTo(options.length - 1);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return {
    isOpen,
    activeIndex,
    rootRef,
    triggerRef,
    activeOptionRef,
    toggle: () => (isOpen ? close() : open()),
    select,
    hover: setActiveIndex,
    handleKeyDown,
  };
}
