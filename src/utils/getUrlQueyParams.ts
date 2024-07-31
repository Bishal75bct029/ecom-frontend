export const getUrlQueryParams = (payload: Record<string, string>) => {
  const params = new URLSearchParams();
  Object.keys(payload).forEach((key) => payload[key] && params.set(key, payload[key]));
  return params;
};
