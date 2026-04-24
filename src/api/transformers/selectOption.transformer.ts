import type { SelectOption } from '@/models/selectOption.model';
import type { ApiSelectOption } from '../types/selectOption.api';

export const transformSelectOption = (selectOption: ApiSelectOption): SelectOption => ({
  id: selectOption.id,
  value: selectOption.label,
});
