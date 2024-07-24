import config from '@/config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface AxiosBaseResponse {
  statusCode: number;
}

export interface CustomAxiosError extends AxiosBaseResponse {
  message: string;
  error: string;
}

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  paramsSerializer: (params) => {
    const query = Object.keys(params).map((key) => {
      if (!params[key]) return null;
      return [key, params[key]].map(encodeURIComponent).join('=');
    });
    return query.filter((item) => item).join('&');
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.data) {
      return response.data.data;
    }
    return null;
  },
  (error) => {
    if (!error.response) {
      const error = { response: { data: { message: 'Something went wrong!' } } };
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return axios
        .post(`${originalRequest.baseURL}api/users/refresh`, {}, { withCredentials: true })
        .then((res: AxiosResponse<void, void>) => {
          if (res.status === 200) {
            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              axiosInstance
                .request(config)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            });
            refreshAndRetryQueue.length = 0;
            console.log('here');
            return axiosInstance(originalRequest);
          }
        })
        .catch((error) => {
          console.log(error);
          window.location.replace('/');
          return;
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    if (error && error.response && error.response.status && error.response.status === 403) {
      window.location.replace('/');
      return;
    }

    return Promise.reject(error.response.data);
  },
);
