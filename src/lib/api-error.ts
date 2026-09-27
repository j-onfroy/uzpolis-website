import { isAxiosError } from "axios";

/** Extracts the backend `error` message from an API failure, or returns the fallback. */
export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (isAxiosError<{ error?: string }>(err)) {
    return err.response?.data?.error ?? fallback;
  }
  return fallback;
}
