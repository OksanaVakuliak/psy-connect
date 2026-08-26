import { Button, CheckCircleIcon } from '@/components/ui';
import styles from './BookingModal.module.css';

interface BookingSuccessProps {
  titleId: string;
  name: string;
  onClose: () => void;
}

export default function BookingSuccess({ titleId, name, onClose }: BookingSuccessProps) {
  return (
    <div className={styles.success}>
      <div className={styles.successBody}>
        <p className={styles.successIcon}>
          <CheckCircleIcon />
        </p>

        <h2 className={styles.successTitle} id={titleId}>
          Your session has been booked!
        </h2>

        <p className={styles.successText}>
          We&apos;ll send a confirmation to your email. {name} will contact you shortly.
        </p>

        <Button fullWidth onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
