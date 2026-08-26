'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

interface UseListboxParams {
  options: readonly string[];
  value: string;
  onSelect: (option: string) => void;
}

export function useListbox({ options, value, onSelect }: UseListboxParams) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeOptionRef = useRef<HTMLLIElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
