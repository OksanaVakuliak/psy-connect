'use client';

import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ModalCloseButton } from '../ModalCloseButton/ModalCloseButton';
import styles from './ModalOverlay.module.css';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * `card` is the self-contained dialog: the overlay pads the box and puts the close button in its
 * corner. `panel` is the wider shell for content that brings its own header and footer bars, so it
 * only draws the box and leaves the padding and the close button to that content.
 */
type ModalVariant = 'card' | 'panel';

interface ModalOverlayProps {
  onClose: () => void;
  variant?: ModalVariant;
  labelledBy?: string;
  contentKey?: string;
  children: ReactNode;
}

export function ModalOverlay({
  onClose,
  variant = 'card',
  labelledBy,
  contentKey,
  children,
}: ModalOverlayProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { body, documentElement } = document;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    boxRef.current?.focus();
  }, [contentKey]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // A dropdown inside the modal takes Escape for itself by preventing the default, so the
        // first press closes it and only the next one closes the modal.
        if (!event.defaultPrevented) {
          onClose();
        }

        return;
      }

      if (event.key !== 'Tab' || !boxRef.current) {
        return;
      }

      const focusable = [...boxRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)];

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === boxRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onMouseDown={handleBackdropMouseDown}>
      <div
        ref={boxRef}
        className={`${styles.box} ${styles[variant]}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
      >
        {variant === 'card' && (
          <div className={styles.closeSlot}>
            <ModalCloseButton onClick={onClose} />
          </div>
        )}

        {children}
      </div>
    </div>,
    document.body,
  );
}
