import { fetchLookups } from '@/api/services/lookup.service';
import type { Lookup } from '@/models/lookup.model';
import { ref, type Ref } from 'vue';

export function useLookup(resource: string) {
  const lookups: Ref<Lookup[]> = ref([]);
  const loading = ref(false);
  const error = ref<unknown>(null);

  const getLookups = async () => {
    try {
      loading.value = true;
      lookups.value = await fetchLookups(resource);
    } catch (err) {
      console.error(`Error to fetch ${resource}`);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    // states
    error,
    loading,
    lookups,

    // functions
    getLookups,
  };
}
