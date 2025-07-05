import type { ApiFeature } from '../types/feature.api';
import type { Feature } from '@/models/feature.model';
import { transformFeature } from '../transformers/feature.transformer';
import AxiosService from './AxiosService';

export async function fetchFeatures(): Promise<Feature[]> {
  const response = await AxiosService.get<ApiFeature[]>('/features');
  return response.data.map(transformFeature);
}
