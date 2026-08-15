import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL is not set. Add it to .env.local for local development and to the environment variables of the deployment.',
  );
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
