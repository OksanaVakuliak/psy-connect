import axios from 'axios';

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.';
const NETWORK_MESSAGE = 'No connection to the server. Check your internet and try again.';

interface ApiErrorBody {
  message?: string;
}

export function getErrorStatus(error: unknown): number | undefined {
  return axios.isAxiosError(error) ? error.response?.status : undefined;
}

export function getErrorMessage(error: unknown): string {
  if (!axios.isAxiosError<ApiErrorBody>(error)) {
    return FALLBACK_MESSAGE;
  }

  if (!error.response) {
    return NETWORK_MESSAGE;
  }

  const message = error.response.data?.message;

  return typeof message === 'string' && message.trim() ? message : FALLBACK_MESSAGE;
}
