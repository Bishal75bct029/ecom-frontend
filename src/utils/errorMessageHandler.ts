import { toastError } from '.';

export const errorMessageHandler = (err: any) => {
  if (err?.message) return toastError(Array.isArray(err?.message) ? err?.message[0] : err?.message);

  return toastError('Something went wrong!');
};
