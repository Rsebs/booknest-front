import type { Lookup } from '@/models/lookup.model';
import type { ApiLookup } from '../types/lookup.api';

export const transformLookup = (lookup: ApiLookup): Lookup => ({
  id: lookup.id,
  value: lookup.value,
});
