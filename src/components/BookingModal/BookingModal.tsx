'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ModalCloseButton, ModalOverlay } from '@/components/ui';
import BookingForm from './BookingForm';
import BookingSuccess from './BookingSuccess';
import styles from './BookingModal.module.css';

const AVATAR_SIZE = 80;
const TITLE_ID = 'booking-modal-title';

interface BookingModalProps {
  id: string;
  name: string;
  avatar_url: string;
  onClose: () => void;
}

export default function BookingModal({ id, name, avatar_url, onClose }: BookingModalProps) {
  const [isBooked, setIsBooked] = useState(false);

  return (
    <ModalOverlay
      onClose={onClose}
      variant="panel"
      labelledBy={TITLE_ID}
      contentKey={isBooked ? 'success' : 'form'}
    >
      {isBooked ? (
        <BookingSuccess titleId={TITLE_ID} name={name} onClose={onClose} />
      ) : (
        <>
          <header className={styles.header}>
            <h2 className={styles.title} id={TITLE_ID}>
              Book a Session
            </h2>

            <ModalCloseButton onClick={onClose} />
          </header>

          <div className={styles.psychologist}>
            <Image
              className={styles.avatar}
              src={avatar_url}
              alt=""
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
            />

            <h3 className={styles.name}>{name}</h3>
          </div>

          <BookingForm psychologistId={id} onSuccess={() => setIsBooked(true)} onCancel={onClose} />
        </>
      )}
    </ModalOverlay>
  );
}
