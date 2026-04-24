import { fetchSelectOptions } from '@/api/services/selectOption.service';
import type { SelectOption } from '@/models/selectOption.model';
import { ref, type Ref } from 'vue';

export function useSelectOption(nameModel: string) {
  const selectOptions: Ref<SelectOption[]> = ref([]);
  const loading = ref(false);
  const error = ref<unknown>(null);

  const getSelectOption = async () => {
    try {
      loading.value = true;
      selectOptions.value = await fetchSelectOptions(nameModel);
    } catch (err) {
      console.error(`Error to fetch ${nameModel}`);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    selectOptions,
    getSelectOption,
    loading,
  };
}
