import { transformLookup } from '../transformers/lookup.transformer';
import AxiosService from './AxiosService';
import type { ApiLookup } from '../types/lookup.api';

export async function fetchLookups(resource: string) {
  const response = await AxiosService.get<ApiLookup[]>(`lookups/${resource}`);
  return response.data.map(transformLookup);
}
