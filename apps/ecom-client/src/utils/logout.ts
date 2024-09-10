import { clearLocalStorage } from './storage';

export const logout = () => {
  clearLocalStorage();
  window.location.href = '/';
};
