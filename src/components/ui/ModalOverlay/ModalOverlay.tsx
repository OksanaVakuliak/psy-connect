'use client';

import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { IconX } from '@tabler/icons-react';
import styles from './ModalOverlay.module.css';

const CLOSE_ICON_SIZE = 14;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalOverlayProps {
  onClose: () => void;
  labelledBy?: string;
  children: ReactNode;
}

export function ModalOverlay({ onClose, labelledBy, children }: ModalOverlayProps) {
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

    boxRef.current?.focus();

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
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
        className={styles.box}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          <IconX size={CLOSE_ICON_SIZE} />
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
}
