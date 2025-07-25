import type { ApiResponse } from '@/api/types/axiosResponse.type';
import { useUserStore } from '@/stores/userStore';
import axios, { type AxiosInstance } from 'axios';

export default class AxiosService {
  static axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  static initialize() {
    this.axiosInstance.interceptors.request.use((config) => {
      const userStore = useUserStore();
      if (userStore.isAuthenticated) {
        config.headers.Authorization = `Bearer ${userStore.apiToken}`;
      }
      return config;
    });
  }

  static async get<T = unknown>(
    url: string,
    params?: Record<string, unknown>,
  ): Promise<ApiResponse<T>> {
    return this.axiosInstance.get(url, { params }).then((response) => response.data);
  }

  static async post<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ): Promise<ApiResponse<T>> {
    return this.axiosInstance.post(url, data, { params }).then((response) => response.data);
  }
}
