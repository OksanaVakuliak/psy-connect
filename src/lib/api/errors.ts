import axios from 'axios';

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.';

interface ApiErrorBody {
  message?: string;
}

export function getErrorStatus(error: unknown): number | undefined {
  return axios.isAxiosError(error) ? error.response?.status : undefined;
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return FALLBACK_MESSAGE;
}
