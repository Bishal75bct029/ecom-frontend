import { toastError } from '.';

export const errorMessageHandler = (err: any, url: string) => {
  if (url === 'api/users/whoami') return;
  if (err?.message) return toastError(Array.isArray(err?.message) ? err?.message[0] : err?.message);

  return toastError('Something went wrong!');
};
