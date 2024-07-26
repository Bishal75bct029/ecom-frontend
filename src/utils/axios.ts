import config from '@/config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getStorageItem, setStorageItem } from './storage';
import { LoginResponse } from '@/store/features/auth/types';
import { logout } from './logout';

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
    const token = getStorageItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

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

      const refreshToken = getStorageItem('refreshToken');
      if (!refreshToken) return Promise.reject(error.response.data);

      return axios
        .post(`${originalRequest.baseURL}api/users/refresh`, { refreshToken })
        .then((res: AxiosResponse<LoginResponse, void>) => {
          if (res.status === 200) {
            setStorageItem('token', res.data.token);
            setStorageItem('refreshToken', res.data.refreshToken);

            originalRequest.headers.Authorization = 'Bearer ' + res.data.token;
            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              axiosInstance
                .request(config)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            });
            refreshAndRetryQueue.length = 0;
            return axiosInstance(originalRequest);
          }
        })
        .catch(() => {
          logout();
          return;
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    if (error && error.response && error.response.status && error.response.status === 403) {
      logout();
      return;
    }

    return Promise.reject(error.response.data);
  },
);
