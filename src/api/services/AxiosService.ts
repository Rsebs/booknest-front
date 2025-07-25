import { ApiError, type ApiErroResponse, type ApiResponse } from '@/api/types/axiosResponse.type';
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

  private static handleError(error: unknown): never {
    if (axios.isAxiosError(error) && error.response?.data) {
      const err = error.response.data as ApiErroResponse;
      throw new ApiError(err);
    }

    const errorResponse = {
      status: 'error',
      message: 'Something went wrong',
      code: 0,
      errors: error instanceof Error ? error.message : 'Unknown error',
    } satisfies ApiErroResponse;

    throw new ApiError(errorResponse);
  }

  static async get<T = unknown>(
    url: string,
    params?: Record<string, unknown>,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  static async post<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post(url, data, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
