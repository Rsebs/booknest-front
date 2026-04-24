import { transformSelectOption } from '../transformers/selectOption.transformer';
import AxiosService from './AxiosService';
import type { ApiSelectOption } from '../types/selectOption.api';

export async function fetchSelectOptions(nameModel: string) {
  const response = await AxiosService.get<ApiSelectOption[]>(`select/${nameModel}`);
  return response.data.map(transformSelectOption);
}
