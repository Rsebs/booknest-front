import type { ApiResponse } from '@/api/types/axiosResponse.type';
import axios, { type AxiosInstance } from 'axios';

export default class AxiosService {
  static axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  static async get<T = unknown>(
    url: string,
    params?: Record<string, unknown>,
  ): Promise<ApiResponse<T>> {
    return this.axiosInstance.get(url, { params }).then((response) => response.data);
  }
}
