import type { Lookup } from '@/models/lookup.model';
import { INITIAL_CATEGORIES } from '../mockData';

export async function fetchLookups(_resource: string): Promise<Lookup[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return INITIAL_CATEGORIES;
}
