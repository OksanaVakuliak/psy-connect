import { IconAlertTriangle } from '@tabler/icons-react';
import { Button } from '../Button/Button';
import { EmptyState } from '../EmptyState/EmptyState';
import { Spinner } from '../Spinner/Spinner';

const ICON_SIZE = 64;

interface ErrorStateProps {
  description: string;
  isRetrying?: boolean;
  onRetry: () => void;
}

// A failed first request leaves nothing to show, so the toast alone would leave a blank page.
export function ErrorState({ description, isRetrying, onRetry }: ErrorStateProps) {
  return (
    <EmptyState
      icon={<IconAlertTriangle size={ICON_SIZE} stroke={1.5} />}
      title="Something went wrong"
      description={description}
      action={
        <Button size="md" disabled={isRetrying} onClick={onRetry}>
          {isRetrying ? <Spinner label="Retrying" /> : 'Try again'}
        </Button>
      }
    />
  );
}
