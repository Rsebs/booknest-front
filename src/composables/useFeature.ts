import { fetchFeatures } from '@/api/services/feature.service';
import type { Feature } from '@/models/feature.model';
import { ref, type Ref } from 'vue';

export function useFeatures() {
  const features: Ref<Feature[]> = ref([]);
  const loading = ref(false);
  const error = ref<unknown>(null);

  const getFeatures = async () => {
    try {
      loading.value = true;
      features.value = await fetchFeatures();
    } catch (err) {
      console.error('Error loading features:', err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    features,
    loading,
    error,
    getFeatures,
  };
}
