import { IconX } from '@tabler/icons-react';
import styles from './ModalOverlay.module.css';

const CLOSE_ICON_SIZE = 14;

interface ModalCloseButtonProps {
  onClick: () => void;
}

export function ModalCloseButton({ onClick }: ModalCloseButtonProps) {
  return (
    <button type="button" className={styles.close} onClick={onClick} aria-label="Close">
      <IconX size={CLOSE_ICON_SIZE} />
    </button>
  );
}
