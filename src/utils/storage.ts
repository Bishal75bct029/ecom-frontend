export const getStorageItem = <T>(key: string) => {
  const value = localStorage.getItem(key) || '';
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

export const setStorageItem = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

export const removeStorageItem = (key: string) => localStorage.removeItem(key);

export const clearLocalStorage = () => localStorage.clear();
