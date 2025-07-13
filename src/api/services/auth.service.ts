import { transformUser } from '../transformers/auth.transformer';
import type { ApiLoginUser } from '../types/auth.api';
import AxiosService from './AxiosService';

export async function loginUser(email: string, password: string) {
  const response = await AxiosService.post<ApiLoginUser>('login', { email, password });
  return transformUser(response.data);
}
